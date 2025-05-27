import {date, integer, pgTable, timestamp, varchar} from "drizzle-orm/pg-core";

export const links = pgTable("links", {
    id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
    original_url: varchar("original_url", {length: 500}).notNull(),
    site_title: varchar("site_title", {length: 500}).notNull(),
    site_favicon: varchar("site_favicon", {length: 255}).notNull(),
    short_url: varchar("short_url", {length: 255}).notNull().unique(),
    generated_id: varchar("generated_id", {length: 50}).notNull().unique(),
})


export const analytics = pgTable("analytics", {
    id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
    linkGeneratedId: varchar("link_generated_id", {length: 50}).notNull().references(() => links.generated_id, {onDelete: "cascade"}),
    visitedAt: timestamp("visited_at", {withTimezone: true}).notNull().defaultNow(),
})

export const linkDailyStats = pgTable("link_daily_stats", {
    id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
    linkGeneratedId: varchar("link_generated_id", {length: 50}).notNull().references(() => links.generated_id, {onDelete: "cascade"}),
    date: date("date").notNull(),
    visitCount: integer("visit_count").notNull().default(0)
})