import { eq } from "drizzle-orm";
import { database } from "../../infrastructure/database/database";
import { actorsToFilms } from "../actors-to-films/schema";
import { films } from "./schema";

const filmDataMapper = (film: {
  id: number;
  name: string;
  actorsToFilms: {
    actor: {
      id: number;
      name: string;
    };
  }[];
}) => ({
  id: film.id,
  name: film.name,
  actors: film.actorsToFilms.map(({ actor }) => actor),
});

export interface CreateFilmData {
  name: string;
  actors: number[];
}

export async function createFilm(data: CreateFilmData) {
  // https://github.com/drizzle-team/drizzle-orm/discussions/1170
  return database.transaction((tx) => {
    const [result] = tx
      .insert(films)
      .values({
        name: data.name,
      })
      .returning({
        id: films.id,
      })
      .all();

    tx.insert(actorsToFilms)
      .values(
        data.actors.map((actorId) => ({
          actorId,
          filmId: result.id,
        }))
      )
      .run();

    return findOneFilm(result.id);
  });
}

export async function findAllFilms() {
  const result = await database.query.films.findMany({
    with: {
      actorsToFilms: {
        with: {
          actor: true,
        },
      },
    },
  });

  return result.map(filmDataMapper);
}

export async function findOneFilm(id: number) {
  const result = await database.query.films.findFirst({
    where: eq(films.id, id),
    with: {
      actorsToFilms: {
        with: {
          actor: true,
        },
      },
    },
  });

  if (result) {
    return filmDataMapper(result);
  }
}

export interface UpdateFilmData extends Partial<CreateFilmData> {}

export async function updateFilm(id: number, data: UpdateFilmData) {
  return database.transaction((tx) => {
    if (data.name) {
      tx.update(films)
        .set({
          name: data.name,
        })
        .where(eq(films.id, id))
        .run();
    }

    if (data.actors) {
      tx.delete(actorsToFilms).where(eq(actorsToFilms.filmId, id)).run();
      tx.insert(actorsToFilms)
        .values(
          data.actors.map((actorId) => ({
            actorId,
            filmId: id,
          }))
        )
        .run();
    }

    return findOneFilm(id);
  });
}

export async function deleteFilm(id: number) {
  await database.delete(films).where(eq(films.id, id));
  return {};
}
