import type { Config } from "drizzle-kit";
import { join } from "path";

export default {
  schema: "./src/**/schema.ts",
  driver: "better-sqlite",
  dbCredentials: {
    url: join(process.cwd(), "database/sqlite.db"),
  },
  out: "./database/migrations",
} satisfies Config;
