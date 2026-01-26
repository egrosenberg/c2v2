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
}

runSeeding();
