import { pgTable, serial, text, timestamp, boolean, integer, uuid, varchar } from 'drizzle-orm/pg-core';

export const articles = pgTable('articles', {
	article_id: serial('article_id').primaryKey(),
	slug: text('slug').unique().notNull(),
	created_at: timestamp('created_at').defaultNow(),
	published_at: timestamp('published_at'),
	updated_at: timestamp('updated_at').defaultNow(),
	thumbnail: text('thumbnail'),
	thumbnail_id: text('thumbnail_id')
});

export const articleTranslations = pgTable('article_translations', {
	translation_id: serial('translation_id').primaryKey(),
	article_id: integer('article_id').references(() => articles.article_id, { onDelete: 'cascade' }),
	language_code: varchar('language_code', { length: 2 }).default('es'),
	slug: text('slug').unique().notNull(),
	title: text('title').notNull(),
	teaser: text('teaser'),
	content: text('content'),
	created_at: timestamp('created_at').defaultNow(),
	published_at: timestamp('published_at'),
	updated_at: timestamp('updated_at').defaultNow()
});

export const profiles = pgTable('profiles', {
	id: uuid('id').primaryKey(),
	email: text('email').unique(),
	is_admin: boolean('is_admin').default(false)
});
