import { relations } from "drizzle-orm";
import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { actorsToFilms } from "../actors-to-films/schema";

export const actors = sqliteTable("actors", {
  id: int("id").primaryKey({
    autoIncrement: true,
  }),
  name: text("name").notNull(),
});

export const actorsRelations = relations(actors, ({ many }) => ({
  actorsToFilms: many(actorsToFilms),
}));
