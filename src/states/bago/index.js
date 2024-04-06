import myDayTime from "../../daytime/daytimes.js";
import BagoData from "./bago.js";
import "../../index.css";

function bago() {
  const MYANMAR_TIMEZONE_OFFSET_MS = 390 * 60 * 1000;
  const dtt = new Date();
  const loct = dtt.getTime();
  const loctzof = dtt.getTimezoneOffset() * 60 * 1000;
  const utcn = loct + loctzof;
  const mytime = utcn + MYANMAR_TIMEZONE_OFFSET_MS;
  const mmm = new Date(mytime).toDateString();
  const tab = document.querySelector("#v");
  tab.innerHTML = "";
  let dat = [];
  BagoData.forEach((item) => {
    const dt = myDayTime(
      item.coordinates[0],
      item.coordinates[1],
      item.timezone
    );
    const dtt = {
      ct: item.name,
      sr: dt.sunrise,
      ss: dt.sunset,
      dt: dt.daytime,
      mp: item.link,
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
  <br>
  <span class='rg-dek' style="font-size: small;">Current Date At Myanmar : ${mmm}</span>
  <br>
  <hr>
  `;
  tb.appendChild(capt);
  const th = document.createElement("thead");
  th.innerHTML = `
  <thead>
  <tr>
    <th class='text '>Township</th>
    <th class='text'>Sunrise</th>
    <th class='text'>Sunset</th>
    <th class='text'>Daytime</th>
    <th class='text '>Map</th>
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
      <td class='text' data-title='Township'>${i.ct}</td>
      <td class='text' data-title='Sunrise'>${i.sr}</td>
      <td  class='text' data-title='Sunset'>${i.ss}</td>
      <td class='text' data-title='Daytime'>${i.dt}</td>
      <td class='text' data-title='Map'><a href="${i.mp}" target="_blank">Map</a></td>
    </tr>
    `;
    })
    .join("")}
  `;
  tb.appendChild(tbod);
  tab.appendChild(tb);
}

bago();

export default bago;
