import { hash, verify } from "argon2";
import { eq } from "drizzle-orm";
import { SignJWT, jwtVerify } from "jose";
import { database } from "../../infrastructure/database/database";
import { users } from "./schema";

const secret = new TextEncoder().encode("secret");

export async function signUp(username: string, password: string) {
  const [user] = await database
    .insert(users)
    .values({
      username,
      password: await hash(password),
    })
    .returning({
      id: users.id,
    });

  return createToken(user.id);
}

export async function signIn(username: string, password: string) {
  if (typeof username === "string" && typeof password === "string") {
    const [user] = await database
      .select()
      .from(users)
      .where(eq(users.username, username));

    if (await verify(user.password, password)) {
      return createToken(user.id);
    } else {
      throw Object.assign(new Error(), {
        code: "NOT_AUTHORIZED",
      });
    }
  }
}

async function createToken(id: number) {
  return {
    token: await new SignJWT()
      .setProtectedHeader({
        alg: "HS256",
      })
      .setSubject(id.toString())
      .setIssuedAt()
      .setExpirationTime("10m")
      .sign(secret),
  };
}

export async function verifyUser(token: string) {
  const { payload } = await jwtVerify(token, secret);
  return {
    userId: payload.sub,
  };
}
