import { APPNAME } from "./constants.mjs";

const API_URL = "https://api.openai.com/v1/engines";

const log = console.log;

export default async (yargs: any) => {
  const { argv } = yargs.usage(`${APPNAME} engines --flag`).help();
  const { key } = argv;
  const result: any = await fetch(API_URL, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${key}`,
    },
  }).then((r) => r.json());
  const { data }: any = result;
  for (const { id } of data) {
    log(id);
  }
};
