import { drizzle, PostgresJsDatabase } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { z } from "zod";
import { fromZodError } from "zod-validation-error";
import "dotenv/config";

const envSchema = z.object({
  DATABASE_HOST: z.string().min(1),
  DATABASE_PORT: z.string().min(1),
  DATABASE_USERNAME: z.string().min(1),
  DATABASE_PASSWORD: z.string().min(1),
  DATABASE_NAME: z.string().min(1),
});

export const indexingOptionsSchema = z.object({
  DATABASE_HOST: z.string().min(1),
  DATABASE_PORT: z.string().min(1),
  DATABASE_USERNAME: z.string().min(1),
  DATABASE_PASSWORD: z.string().min(1),
  DATABASE_NAME: z.string().min(1).optional(),
});

const globalDb = globalThis as unknown as { __db?: PostgresJsDatabase };

type Options = z.infer<typeof envSchema>;

export function database(options?: Options) {
  try {
    const parsed = envSchema.parse(options ?? process.env);

    if (!globalDb.__db) {
      const connectionString =
        `postgres://${parsed.DATABASE_USERNAME}:${parsed.DATABASE_PASSWORD}` +
        `@${parsed.DATABASE_HOST}:` +
        `${parsed.DATABASE_PORT}/${parsed.DATABASE_NAME}`;

      const client = postgres(connectionString, {
        max: Number(process.env.DB_POOL_MAX ?? "10"),
        idle_timeout: Number(process.env.DB_IDLE_TIMEOUT_SEC ?? "10"),
        connect_timeout: Number(process.env.DB_CONNECT_TIMEOUT_SEC ?? "15"),
      });

      globalDb.__db = drizzle(client) as PostgresJsDatabase;
    }

    return globalDb.__db;
  } catch (err) {
    if (err instanceof z.ZodError) throw fromZodError(err);
    throw err;
  }
}
