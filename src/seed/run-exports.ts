import seedFunctions from "./seed-functions";

export default async function runSeeding() {
  for (const fn of seedFunctions) {
    try {
      console.info(`Seeding ${fn.name}...`);
      await fn();
    } catch (err) {
      console.error(`Error in seeding ${fn.name}:`, err);
    }
  }
  console.info("Done seeding, cleaning up...");

  // console.info("Exporting aspects");
  // const { records } = await findAspects();
  // const name = "aspects";
  // const outpath = `./src/seed/output/${name}.json`;
  // await new Promise((resolve) =>
  //   writeFile(outpath, JSON.stringify(records, undefined, 2), () =>
  //     resolve(true),
  //   ),
  // );
}

runSeeding();
