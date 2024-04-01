import sun from "./sun.js";

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

// ----------------------------------------------------------------- //
export default function myDayTime(latitude, longitude, timezone) {
  const [localRise, localSet] = sun(latitude, longitude, timezone);
  let sunrise = "N/A";
  let sunset = "N/A";
  let daytime = "N/A";
  if (localRise !== null && localSet !== null) {
    sunrise = convertDecimalTime(localRise);
    sunset = convertDecimalTime(localSet);
    daytime = timeDiff(localRise, localSet);
  }
  return {
    sunrise,
    sunset,
    daytime,
  };
}
