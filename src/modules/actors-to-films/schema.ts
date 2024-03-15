import { relations } from "drizzle-orm";
import { index, int, primaryKey, sqliteTable } from "drizzle-orm/sqlite-core";
import { actors } from "../actors/schema";
import { films } from "../films/schema";

export const actorsToFilms = sqliteTable(
  "actors_to_films",
  {
    actorId: int("actor_id")
      .notNull()
      .references(() => actors.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    filmId: int("film_id")
      .notNull()
      .references(() => films.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
  },
  (table) => ({
    actorIdx: index("actor_idx").on(table.actorId),
    filmIdx: index("film_idx").on(table.filmId),
    pk: primaryKey({
      columns: [table.actorId, table.filmId],
    }),
  })
);

export const actorsToFilmsRelations = relations(actorsToFilms, ({ one }) => ({
  actor: one(actors, {
    fields: [actorsToFilms.actorId],
    references: [actors.id],
  }),
  film: one(films, {
    fields: [actorsToFilms.filmId],
    references: [films.id],
  }),
}));
