import { eq } from "drizzle-orm";
import { database } from "../../infrastructure/database/database";
import { actors } from "./schema";

export interface CreateActorData {
  name: string;
}

export async function createActor(data: CreateActorData) {
  const [result] = await database.insert(actors).values(data).returning({
    id: actors.id,
    name: actors.name,
  });
  return result;
}

export async function findAllActors() {
  return database
    .select({
      id: actors.id,
      name: actors.name,
    })
    .from(actors);
}

export async function findOneActor(id: number) {
  const [result] = await database
    .select({
      id: actors.id,
      name: actors.name,
    })
    .from(actors)
    .where(eq(actors.id, id));
  return result;
}

export interface UpdateActorData extends CreateActorData {}

export async function updateActor(id: number, data: UpdateActorData) {
  const [result] = await database
    .update(actors)
    .set(data)
    .where(eq(actors.id, id))
    .returning({
      id: actors.id,
      name: actors.name,
    });
  return result;
}

export async function deleteActor(id: number) {
  await database.delete(actors).where(eq(actors.id, id));
}
