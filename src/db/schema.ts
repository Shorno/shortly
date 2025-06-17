import {boolean, date, integer, pgTable, text, timestamp, varchar} from "drizzle-orm/pg-core";
import {user} from "@/db/auth-schema";

export const links = pgTable("links", {
    id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
    original_url: varchar("original_url", {length: 500}).notNull(),
    site_title: varchar("site_title", {length: 500}).notNull(),
    site_favicon: varchar("site_favicon", {length: 255}).notNull(),
    short_url: varchar("short_url", {length: 255}).notNull().unique(),
    slug: varchar("slug", {length: 50}).notNull().unique(),
    user_id: text("user_id").references(() => user.id, {onDelete: 'cascade'}),
    is_public: boolean("is_public").notNull().default(true),
})


export const analytics = pgTable("analytics", {
    id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
    linkSlug: varchar("link_slug", {length: 50}).notNull().references(() => links.slug, {
        onDelete: "cascade",
        onUpdate: "cascade"
    }),
    visitedAt: timestamp("visited_at", {withTimezone: true}).notNull().defaultNow(),
})

export const linkDailyStats = pgTable("link_daily_stats", {
    id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
    linkSlug: varchar("link_slug", {length: 50}).notNull().references(() => links.slug, {
        onDelete: "cascade",
        onUpdate: "cascade"
    }),
    date: date("date").notNull(),
    visitCount: integer("visit_count").notNull().default(0)
})
