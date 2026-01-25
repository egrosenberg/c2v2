import { createAspect } from "@db/services/aspects/create-aspect";
import { deleteAspect } from "@db/services/aspects/delete-aspect";
import { createDomain } from "@db/services/domains/create-domain";
import { deleteDomain } from "@db/services/domains/delete-domain";
import { createKeeperClass } from "@db/services/keeper-classes/create-keeper-class";
import { deleteKeeperClass } from "@db/services/keeper-classes/delete-keeper-class";
import { findKeeperClasses } from "@db/services/keeper-classes/find-keeper-classes";
import { search } from "@db/services/search/search";
import { createSkill } from "@db/services/skills/create-skill";
import { deleteSkill } from "@db/services/skills/delete-skill";
import { createSubclass } from "@db/services/subclasses/create-subclass";
import { deleteSubclass } from "@db/services/subclasses/delete-subclass";

const seedAndStuff = async () => {
  try {
    // Create domains
    const brutal = await createDomain({ name: "Brutal" });
    const solar = await createDomain({ name: "Solar" });

    // Create class
    const warden = await createKeeperClass({
      name: "Warden",
      canAlways: ["do some things", "do some other things"],
    });

    // Create subclasses
    const gladiator = await createSubclass({
      name: "Gladiator",
      classId: warden.id,
      domainId: brutal.id,
    });
    const sunmane = await createSubclass({
      name: "Sunmane",
      classId: warden.id,
      domainId: solar.id,
    });

    const sunblade = await createAspect({
      name: "Sunblade",
      category: sunmane.name,
      sourceType: "subclass",
      sourceId: sunmane.id,
      description:
        "Whenever you deal damage with a melee weapon you may change the damage type to Fire.",
    });

    const flameSlash = await createSkill({
      name: "Flame Slash",
      type: "Magic",
      subtype: "Fire",
      actions: 2,
      range: "Self",
      description:
        "Send an arc of flaming energy from your weapon, dealing 2d6 Fire damage to each creature in a 5-foot wide 30-foot long line. Any targets left Unwarded begin Burning.",
      sourceType: "aspect",
      sourceId: sunblade.id,
    });

    const fireball = await createSkill({
      name: "Fireball",
      type: "Magic",
      subtype: "Fire",
      actions: 2,
      damageTypes: "fire",
      sourceType: "domain",
      sourceId: solar.id,
    });

    const pd = await createSkill({
      name: "Phoenix Dive",
      type: "Magic",
      subtype: "Fire",
      actions: 3,
      damageTypes: "fire",
      sourceType: "subclass",
      sourceId: sunmane.id,
    });

    console.log(JSON.stringify(await search({ searchString: "sun" }), null, 2));

    await deleteDomain({ id: brutal.id });
    await deleteDomain({ id: solar.id });
    await deleteKeeperClass({ id: warden.id });
    await deleteSubclass({ id: gladiator.id });
    await deleteSubclass({ id: sunmane.id });
    await deleteSkill({ id: fireball.id });
    await deleteSkill({ id: pd.id });
    await deleteSkill({ id: flameSlash.id });
    await deleteAspect({ id: sunblade.id });
  } catch (error) {
    console.log(error);
  }
};

seedAndStuff();
