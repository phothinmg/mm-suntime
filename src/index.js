import data from "./data/cities.js";
import myDayTime from "./daytime/daytimes.js";
import "./index.css";
import capt from "./components/capt.js";
function daytime() {
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
