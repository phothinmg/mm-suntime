import { writeJson, readJson } from "array-json";

const st = await readJson("./src/data/bago/villagePoints.json");
const bgo = st.features.filter((i) => i.properties.TS === "Bago");
const stobj = {
  id: 7,
  name: "Bago Region",
  coordinates: [18.25, 96.0],
  map_link: "https://maps.app.goo.gl/NfhjDCRBPdy7FXES8",
  districts: [
    {
      id: 701,
      name: "Bago District",
      coordinates: [17.733333, 96.0],
      map_link: "https://maps.app.goo.gl/8j5sDjbN73XHGPsL9",
      townships: [
        {
          id: 7011,
          name: "Bago Township",
          coordinates: [17.316667, 96.45],
          map_link: "https://maps.app.goo.gl/RqqgQfKQ3ZRNX1vR6",
          villages: [],
        },
      ],
    },
  ],
};

await writeJson("aa.json", bgo)
