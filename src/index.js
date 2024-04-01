import data from "./data/cities.js";
import myDayTime from "./daytime/daytimes.js";
import "./index.css";

function daytime() {
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
  const mmtz = -390 * 60 * 1000;
  const dtt = new Date();
  const utcnow = Date.UTC(
    dtt.getFullYear(),
    dtt.getMonth(),
    dtt.getDate(),
    dtt.getHours(),
    dtt.getMinutes(),
    dtt.getSeconds(),
    dtt.getMilliseconds()
  );
  const mmloc = mmtz + utcnow;
  const mmdate = new Date(mmloc).toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "2-digit",
  });
  // const datsplit = mmdate.split(" ");
  // const dateToShow = datsplit.slice(0,4).join(" ");
  // console.log(dateToShow);
  // console.log(new Date().toString());
  const view = document.getElementById("v");
  view.innerHTML = "";
  let dat = [];
  data.forEach((item) => {
    const dt = myDayTime(item.latitude, item.longitude, item.timezone);
    const dtt = {
      ct: item.city,
      si: item.state_id,
      st: item.state,
      sr: dt.sunrise,
      ss: dt.sunset,
      dt: dt.daytime,
    };
    dat.push(dtt);
  });
  const tb = document.createElement("table");
  tb.classList.add("rg-table");
  tb.classList.add("zebra");
  tb.setAttribute("summary", "Hed");
  const capt = document.createElement("caption");
  capt.classList.add("rg-header");
  capt.innerHTML = `
  <span class='rg-hed'>Myanmar</span>
	<span class='rg-dek'>Sunrise, sunset and time of day for cities</span>
  <br>
  <hr>
  <br>
  <span class='rg-dek' style="font-weight: bold;">User's Location</span>
  <br>
  <span class='rg-dek' style="font-size: small;" id="sr"></span>
  <span class='rg-dek' style="font-size: small;" id="ss"></span>
  <span class='rg-dek' style="font-size: small;" id="dayt"></span>
  <br>
  <hr>
  <br>
  <span class='rg-dek' style="font-weight: bold;">${mmdate} (GMT+0630)</span>
  <br>
  <hr>
  `;
  tb.appendChild(capt);
  const th = document.createElement("thead");
  th.innerHTML = `
  <thead>
  <tr>
    <th class='text '>City</th>
    <th class='text '>State</th>
    <th class='text'>Sunrise</th>
    <th class='text'>Sunset</th>
    <th class='text'>Daytime</th>
  </tr>
  </thead>
  `;
  tb.appendChild(th);
  const tbod = document.createElement("tbody");
  tbod.innerHTML = `
  ${dat
    .map((i) => {
      return `
    <tr>
      <td class='text ' data-title='City'>${i.ct}</td>
      <td class='text ' data-title='State'>${i.st}</td>
      <td class='text ' data-title='Sunrise'>${i.sr}</td>
      <td  class='text ' data-title='Sunset'>${i.ss}</td>
      <td class='text ' data-title='Daytime'>${i.dt}</td>
    </tr>
    `;
    })
    .join("")}
  `;
  tb.appendChild(tbod);
  view.appendChild(tb);
}

daytime();

export default daytime;
