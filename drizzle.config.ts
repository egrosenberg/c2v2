import { defineConfig } from "drizzle-kit";

const {
  DATABASE_USERNAME,
  DATABASE_PASSWORD,
  DATABASE_HOST,
  DATABASE_PORT,
  DATABASE_NAME,
} = process.env;

export default defineConfig({
  schema: "./src/db/tables/!(*.test).ts",
  out: "./migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: `postgres://${DATABASE_USERNAME}:${DATABASE_PASSWORD}@${DATABASE_HOST}:${DATABASE_PORT}/${DATABASE_NAME}`,
  },
});
