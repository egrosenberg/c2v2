import { pgTable, uuid, primaryKey } from "drizzle-orm/pg-core";
import { skills } from "./skills";
import { subclasses } from "./subclasses";
import { keeperClasses } from "./keeper-classes";
import { domains } from "./domains";
import { aspects } from "./aspects";

export const searchIndex = pgTable("search_index", {
  aspect: uuid("aspect")
    .unique()
    .references(() => aspects.id, {
      onDelete: "cascade",
    }),
  domain: uuid("domain")
    .unique()
    .references(() => domains.id, {
      onDelete: "cascade",
    }),
  keeperClass: uuid("keeper_class")
    .unique()
    .references(() => keeperClasses.id, {
      onDelete: "cascade",
    }),
  skill: uuid("skill")
    .unique()
    .references(() => skills.id, {
      onDelete: "cascade",
    }),
  subclass: uuid("subclass")
    .unique()
    .references(() => subclasses.id, {
      onDelete: "cascade",
    }),
});
