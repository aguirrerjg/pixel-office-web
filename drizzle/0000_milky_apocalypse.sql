CREATE TABLE "article_translations" (
	"translation_id" serial PRIMARY KEY NOT NULL,
	"article_id" integer,
	"language_code" varchar(2) DEFAULT 'es',
	"slug" text NOT NULL,
	"title" text NOT NULL,
	"teaser" text,
	"content" text,
	"created_at" timestamp DEFAULT now(),
	"published_at" timestamp,
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "article_translations_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "articles" (
	"article_id" serial PRIMARY KEY NOT NULL,
	"slug" text NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"published_at" timestamp,
	"updated_at" timestamp DEFAULT now(),
	"thumbnail" text,
	"thumbnail_id" text,
	CONSTRAINT "articles_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "profiles" (
	"id" uuid PRIMARY KEY NOT NULL,
	"email" text,
	"is_admin" boolean DEFAULT false,
	CONSTRAINT "profiles_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "article_translations" ADD CONSTRAINT "article_translations_article_id_articles_article_id_fk" FOREIGN KEY ("article_id") REFERENCES "public"."articles"("article_id") ON DELETE cascade ON UPDATE no action;