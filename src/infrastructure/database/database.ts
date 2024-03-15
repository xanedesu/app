import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import { join } from "path";
import * as actorsToFilms from "../../modules/actors-to-films/schema";
import * as actors from "../../modules/actors/schema";
import * as auth from "../../modules/auth/schema";
import * as films from "../../modules/films/schema";

export const database = drizzle(
  new Database(join(process.cwd(), "database/sqlite.db")),
  {
    logger: {
      logQuery: console.log,
    },
    schema: {
      ...auth,
      ...actors,
      ...actorsToFilms,
      ...films,
    },
  }
);
