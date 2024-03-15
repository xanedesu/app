import { relations } from "drizzle-orm";
import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { actorsToFilms } from "../actors-to-films/schema";

export const films = sqliteTable("films", {
  id: int("id").primaryKey({
    autoIncrement: true,
  }),
  name: text("name").unique().notNull(),
});

export const filmsRelations = relations(films, ({ many }) => ({
  actorsToFilms: many(actorsToFilms),
}));
