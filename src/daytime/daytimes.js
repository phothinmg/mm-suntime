// time different between two decimal time

function timeDiff(decimalTime1, decimalTime2) {
  var seconds1 = Math.floor(decimalTime1 * 3600);
  var seconds2 = Math.floor(decimalTime2 * 3600);
  var diffSeconds = Math.abs(seconds1 - seconds2);
  var decimalDiff = diffSeconds / 3600;
  var hours = Math.floor(decimalDiff);
  var minutes = Math.floor((decimalDiff - hours) * 60);
  var seconds = Math.floor(((decimalDiff - hours) * 60 - minutes) * 60);
  var formattedHours = hours.toString().padStart(2, "0");
  var formattedMinutes = minutes.toString().padStart(2, "0");
  var formattedSeconds = seconds.toString().padStart(2, "0");
  var formattedTimeDiff =
    formattedHours + ":" + formattedMinutes + ":" + formattedSeconds;
  return formattedTimeDiff;
}

function convertDecimalTime(decimalTime) {
  var hours = Math.floor(decimalTime);
  var minutes = Math.floor((decimalTime - hours) * 60);
  var seconds = Math.floor(((decimalTime - hours) * 60 - minutes) * 60);
  var formattedHours = hours.toString().padStart(2, "0");
  var formattedMinutes = minutes.toString().padStart(2, "0");
  var formattedSeconds = seconds.toString().padStart(2, "0");
  var ampm = hours >= 12 ? "PM" : "AM";
  if (hours > 12) {
    formattedHours = (hours - 12).toString().padStart(2, "0");
  } else if (hours === 0) {
    formattedHours = "12";
  }
  var formattedTime =
    formattedHours +
    ":" +
    formattedMinutes +
    ":" +
    formattedSeconds +
    " " +
    ampm;

  return formattedTime;
}
function suntimes(latitude, longitude, timezone) {
  const d = new Date();
  const radians = Math.PI / 180.0;
  const degrees = 180.0 / Math.PI;

  const a = Math.floor((14 - (d.getMonth() + 1.0)) / 12);
  const y = d.getFullYear() + 4800 - a;
  const m = d.getMonth() + 1 + 12 * a - 3;
  const j_day =
    d.getDate() +
    Math.floor((153 * m + 2) / 5) +
    365 * y +
    Math.floor(y / 4) -
    Math.floor(y / 100) +
    Math.floor(y / 400) -
    32045;
  const n_star = j_day - 2451545.0009 - longitude / 360.0;
  const n = Math.floor(n_star + 0.5);
  const solar_noon = 2451545.0009 - longitude / 360.0 + n;
  const M = 356.047 + 0.9856002585 * n;
  const C =
    1.9148 * Math.sin(M * radians) +
    0.02 * Math.sin(2 * M * radians) +
    0.0003 * Math.sin(3 * M * radians);
  const L = (M + 102.9372 + C + 180) % 360;
  const j_transit =
    solar_noon +
    0.0053 * Math.sin(M * radians) -
    0.0069 * Math.sin(2 * L * radians);
  const D =
    Math.asin(Math.sin(L * radians) * Math.sin(23.45 * radians)) * degrees;
  const cos_omega =
    (Math.sin(-0.83 * radians) -
      Math.sin(latitude * radians) * Math.sin(D * radians)) /
    (Math.cos(latitude * radians) * Math.cos(D * radians));
  if (cos_omega > 1) {
    return [null, -1];
  }
  if (cos_omega < -1) {
    return [-1, null];
  }
  const omega = Math.acos(cos_omega) * degrees;
  const j_set = j_transit + omega / 360.0;
  const j_rise = j_transit - omega / 360.0;
  const utc_time_set = 24 * (j_set - j_day) + 12;
  const utc_time_rise = 24 * (j_rise - j_day) + 12;
  const tz_offset =
    timezone === undefined ? (-1 * d.getTimezoneOffset()) / 60 : timezone;
  const local_rise = (utc_time_rise + tz_offset) % 24;
  const local_set = (utc_time_set + tz_offset) % 24;
  return [local_rise, local_set];
}

export default function myDayTime(latitude, longitude, timezone) {
  const [localRise, localSet] = suntimes(latitude, longitude, timezone);
  let sunrise = "N/A";
  let sunset = "N/A";
  let daytime = "N/A";
  if (localRise !== null && localSet !== null) {
    sunrise = convertDecimalTime(localRise);
    sunset = convertDecimalTime(localSet);
    daytime = timeDiff(localRise, localSet);
  }
  return{
    sunrise, sunset, daytime
  }
}
