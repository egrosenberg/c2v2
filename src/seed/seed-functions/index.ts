import seedAspects from "./seed-aspects";
import seedDomains from "./seed-domains";
import seedKeeperClasses from "./seed-keeper-classes";
import seedSkills from "./seed-skills";
import seedSubclasses from "./seed-subclasses";

const seedFunctions = [
  seedDomains,
  seedKeeperClasses,
  seedSubclasses,
  seedAspects,
  seedSkills,
];

export default seedFunctions;
