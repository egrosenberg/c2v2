import { readFile } from "fs";

export async function readJson(name: string) {
  const path = `./src/seed/json/${name}.json`;
  const content = await new Promise<string>((resolve, reject) => {
    readFile(path, "utf8", (err, data) => {
      if (err) reject(err);
      resolve(data);
    });
  });

  return JSON.parse(content);
}
