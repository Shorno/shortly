import {integer, pgTable, varchar} from "drizzle-orm/pg-core";

export const links = pgTable("links", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    originalURL: varchar({length: 500}).notNull(),
    shortURL: varchar({length: 255}).notNull(),
    generatedID: varchar({length: 50}).notNull(),
})