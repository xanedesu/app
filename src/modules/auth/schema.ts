import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
  id: int("id").primaryKey({
    autoIncrement: true,
  }),
  username: text("username").unique().notNull(),
  password: text("password").notNull(),
});
