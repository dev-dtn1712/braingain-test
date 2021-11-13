import { csv } from "csvtojson";

export const getJsonFromCsv = async url => {
  const res = await fetch(url);
  const text = await res.text();
  return await csv().fromString(text);
}