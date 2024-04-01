/* 
* These Codes are  base on ;
*  https://gist.github.com/ruiokada/b28076d4911820ddcbbc
*
* Computations are based on the formulas found in:
* https://en.wikipedia.org/wiki/Julian_day#Converting_Julian_or_Gregorian_calendar_date_to_Julian_Day_Number
* https://en.wikipedia.org/wiki/Sunrise_equation#Complete_calculation_on_Earth
* https://en.wikipedia.org/wiki/Daytime
* https://en.wikipedia.org/wiki/Equation_of_time
*
 */

const RADIANS_PER_DEGREE = Math.PI / 180.0;
const DEGREES_PER_RADIAN = 180.0 / Math.PI;
const DAYS_PER_YEAR = 365;
const DAYS_PER_LEAP_YEAR = 366;
const DAYS_PER_CENTURY = 36524;
const DAYS_PER_400_YEARS = 146097;
const J2000 = 2451545.0009;
const SOLAR_NOON_OFFSET = 12;
const MAX_COS_OMEGA = 1;
const MIN_COS_OMEGA = -1;
const SOLAR_ALTITUDE = -0.83;
const EARTH_TILT = 23.45;

const currentDate = new Date();
const currentMonth = currentDate.getMonth() + 1;
const currentYear = currentDate.getFullYear();
const currentDay = currentDate.getDate();

const a = Math.floor((14 - currentMonth) / 12);
const y = currentYear + 4800 - a;
const m = currentMonth + 12 * a - 3;
const j_day =
  currentDay +
  Math.floor((153 * m + 2) / 5) +
  DAYS_PER_YEAR * y +
  Math.floor(y / 4) -
  Math.floor(y / 100) +
  Math.floor(y / 400) -
  32045;

/**
 * Calculates the local sunrise and sunset times for a given latitude, longitude, and timezone.
 *
 * @param {number} latitude - The latitude of the location in degrees.
 * @param {number} longitude - The longitude of the location in degrees.
 * @param {number} [timezone] - The timezone offset in hours. If not provided, the current timezone offset will be used.
 * @returns {Array} An array containing the local sunrise and sunset times in 24-hour format. If the sun does not rise or set on the given date, 
 * the corresponding value will be -1.
 */
const sun = (latitude, longitude, timezone) => {
  const n_star = j_day - J2000 - longitude / 360.0;
  const n = Math.floor(n_star + 0.5);
  const solar_noon = J2000 - longitude / 360.0 + n;
  const M = 356.047 + 0.9856002585 * n;
  const C =
    1.9148 * Math.sin(M * RADIANS_PER_DEGREE) +
    0.02 * Math.sin(2 * M * RADIANS_PER_DEGREE) +
    0.0003 * Math.sin(3 * M * RADIANS_PER_DEGREE);
  const L = (M + 102.9372 + C + 180) % 360;
  const j_transit =
    solar_noon +
    0.0053 * Math.sin(M * RADIANS_PER_DEGREE) -
    0.0069 * Math.sin(2 * L * RADIANS_PER_DEGREE);
  const D =
    Math.asin(
      Math.sin(L * RADIANS_PER_DEGREE) *
        Math.sin(EARTH_TILT * RADIANS_PER_DEGREE)
    ) * DEGREES_PER_RADIAN;
  const cos_omega =
    (Math.sin(SOLAR_ALTITUDE * RADIANS_PER_DEGREE) -
      Math.sin(latitude * RADIANS_PER_DEGREE) *
        Math.sin(D * RADIANS_PER_DEGREE)) /
    (Math.cos(latitude * RADIANS_PER_DEGREE) *
      Math.cos(D * RADIANS_PER_DEGREE));

  if (cos_omega > MAX_COS_OMEGA) {
    return [null, -1];
  }

  if (cos_omega < MIN_COS_OMEGA) {
    return [-1, null];
  }

  const omega = Math.acos(cos_omega) * DEGREES_PER_RADIAN;
  const j_set = j_transit + omega / 360.0;
  const j_rise = j_transit - omega / 360.0;
  const utc_time_set = 24 * (j_set - j_day) + SOLAR_NOON_OFFSET;
  const utc_time_rise = 24 * (j_rise - j_day) + SOLAR_NOON_OFFSET;
  const tz_offset =
    timezone === undefined
      ? (-1 * currentDate.getTimezoneOffset()) / 60
      : timezone;
  const local_rise = (utc_time_rise + tz_offset) % 24;
  const local_set = (utc_time_set + tz_offset) % 24;

  return [local_rise, local_set];
};

// console.log(sun(20.79077515436522, 97.03366156892119, 6.5));

export default sun;
