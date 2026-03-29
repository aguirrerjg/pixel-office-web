import type { articles, articleTranslations, profiles } from './schema';

export type Article = typeof articles.$inferSelect;
export type ArticleTranslation = typeof articleTranslations.$inferSelect;
export type Profile = typeof profiles.$inferSelect;
