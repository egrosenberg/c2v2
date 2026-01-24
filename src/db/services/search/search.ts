import z from "zod";
import { database } from "../../index";

import { fromZodError } from "zod-validation-error";
import { subclasses } from "@db/tables/subclasses";
import { searchIndex } from "@db/tables/search-index";
import { aspects } from "@db/tables/aspects";
import { eq, or } from "drizzle-orm";
import { domains } from "@db/tables/domains";
import { keeperClasses } from "@db/tables/keeper-classes";
import { skills } from "@db/tables/skills";
import { createFilterComparison } from "../_lib/create-filter-comparison";

const schema = z.object({
  searchString: z.string(),
});

type Options = z.input<typeof schema>;

export async function search(options: Options) {
  try {
    const parsed = schema.parse(options);

    const db = database();

    const nameSearchFilterParts = [
      aspects.name,
      domains.name,
      keeperClasses.name,
      skills.name,
      subclasses.name,
    ].map((column) =>
      or(
        createFilterComparison({
          column: column,
          value: parsed.searchString,
          operator: "substr",
        }),
      ),
    );

    const nameFilter = or(...nameSearchFilterParts);

    const query = db
      .select()
      .from(searchIndex)
      .leftJoin(aspects, eq(searchIndex.aspect, aspects.id))
      .leftJoin(domains, eq(searchIndex.domain, domains.id))
      .leftJoin(keeperClasses, eq(searchIndex.keeperClass, keeperClasses.id))
      .leftJoin(skills, eq(searchIndex.skill, skills.id))
      .leftJoin(subclasses, eq(searchIndex.subclass, subclasses.id))
      .where(nameFilter)
      .$dynamic();

    const total = await db.$count(query);

    const results = await query;

    const records = results.map((record) => ({
      type: Object.entries(record.search_index).find(([, v]) => v)?.[1],
      ...record.aspects,
      ...record.domains,
      ...record.keeper_classes,
      ...record.skills,
      ...record.subclasses,
    }));

    return { total, records };
  } catch (error) {
    if (error instanceof z.ZodError) throw fromZodError(error);
    throw error;
  }
}
