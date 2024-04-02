import { writeJson, readJson } from "array-json";

const a = await readJson("./aa.json");

const b = [];
a.forEach((element) => {
  b.push(element.properties.VT);
});

await writeJson("bb.json", b);
