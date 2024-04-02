import myDayTime from "../daytime/daytimes.js";

// ------------------------------------------------------------- //
const usrtzoffset = (new Date().getTimezoneOffset() / 60) * -1;
const usrtz = Intl.DateTimeFormat().resolvedOptions().timeZone;
navigator.geolocation.getCurrentPosition((postion) => {
  const userdt = myDayTime(
    postion.coords.latitude,
    postion.coords.longitude,
    usrtzoffset
  );
  document.getElementById("sr").innerHTML = `Sunrise : ${userdt.sunrise}`;
  document.getElementById("ss").innerHTML = `Sunset : ${userdt.sunset}`;
  document.getElementById("dayt").innerHTML = `Daytime : ${userdt.daytime}`;
});
// --------------------------------------------------------------- //
const MYANMAR_TIMEZONE_OFFSET_MS = 390 * 60 * 1000;
const dtt = new Date();
const loct = dtt.getTime();
const loctzof = dtt.getTimezoneOffset() * 60 * 1000;
const utcn = loct + loctzof;
const localdate = dtt.toDateString();
setInterval(function () {
  var dt_3 = new Date();
  var dat_3 = dt_3.toLocaleTimeString();
  document.getElementById(
    "usertime"
  ).innerHTML = `Current Time : <span>${dat_3}</span>`;
}, 1000);
// -----------------------------------------------------------------//
const mytime = utcn + MYANMAR_TIMEZONE_OFFSET_MS;
const mmm = new Date(mytime).toDateString();
setInterval(function () {
  const MYANMAR_TIMEZONE_OFFSET_MS_2 = 390 * 60 * 1000;
  const dtt_2 = new Date();
  const loct_2 = dtt_2.getTime();
  const loctzof_2 = dtt_2.getTimezoneOffset() * 60 * 1000;
  const utcn_2 = loct_2 + loctzof_2;
  const myytime = utcn_2 + MYANMAR_TIMEZONE_OFFSET_MS_2;
  const dt = new Date(myytime);
  const dat = dt.toLocaleTimeString();
  document.getElementById(
    "mmclock"
  ).innerHTML = `Current Time : <span>${dat}</span>`;
}, 1000);
//-----------------------------------------------------
const capt = document.createElement("caption");
capt.classList.add("rg-header");
capt.innerHTML = `
  <h1 class='rg-hed'>Myanmar</h1>
  <h2 class='rg-dek'>Sunrise, sunset and time of day for cities</h2>
  <br>
  <hr>
  <br>
  <span class='rg-dek' style="font-weight: bold;">User's Location</span>
  <br>
  <span class='rg-dek' style="font-size: small;">Timezone : ${usrtz}</span>
  <span class='rg-dek' style="font-size: small;">Current Date : ${localdate}</span>
  <span class='rg-dek' style="font-size: small;" id="usertime"></span>
  <span class='rg-dek' style="font-size: small;" id="sr"></span>
  <span class='rg-dek' style="font-size: small;" id="ss"></span>
  <span class='rg-dek' style="font-size: small;" id="dayt"></span>
  <br>
  <hr>
  <br>
  <span class='rg-dek' style="font-weight: bold;">Myanmar GMT+0630</span>
  <br>
  <span class='rg-dek' style="font-size: small;">Current Date : ${mmm}</span>
  <span class='rg-dek' style="font-size: small;" id="mmclock"></span>
  <br>
  <hr>
  `;

export default capt;
