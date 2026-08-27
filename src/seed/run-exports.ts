import exportFunctions from "./export-functions";

export default async function runExports() {
  for (const fn of exportFunctions) {
    try {
      console.info(`Exporting ${fn.name}...`);
      await fn();
    } catch (err) {
      console.error(`Error in seeding ${fn.name}:`, err);
    }
  }
  console.info("Done exporting, cleaning up...");
}

runExports();
