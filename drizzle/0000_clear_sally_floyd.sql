CREATE TABLE "analytics" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "analytics_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"link_generated_id" varchar(50) NOT NULL,
	"visited_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "link_daily_stats" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "link_daily_stats_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"link_generated_id" varchar(50) NOT NULL,
	"date" date NOT NULL,
	"visit_count" integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE "links" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "links_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"original_url" varchar(500) NOT NULL,
	"site_title" varchar(500) NOT NULL,
	"site_favicon" varchar(255) NOT NULL,
	"short_url" varchar(255) NOT NULL,
	"generated_id" varchar(50) NOT NULL,
	CONSTRAINT "links_short_url_unique" UNIQUE("short_url"),
	CONSTRAINT "links_generated_id_unique" UNIQUE("generated_id")
);
--> statement-breakpoint
ALTER TABLE "analytics" ADD CONSTRAINT "analytics_link_generated_id_links_generated_id_fk" FOREIGN KEY ("link_generated_id") REFERENCES "public"."links"("generated_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "link_daily_stats" ADD CONSTRAINT "link_daily_stats_link_generated_id_links_generated_id_fk" FOREIGN KEY ("link_generated_id") REFERENCES "public"."links"("generated_id") ON DELETE cascade ON UPDATE no action;