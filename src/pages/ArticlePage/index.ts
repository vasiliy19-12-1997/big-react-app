export { ArticlePageAsync as ArticlePage } from './ui/ArticlePage/ArticlePage.async';
export type { ArticlePageSchema } from '@/pages/ArticlePage/model/types/articlePageSchema';
export { articlePageActions } from './model/slice/articlePageSlice';
export { getArticlesPageType } from './model/selectors/articles';

export { fetchArticles } from './model/services/fetchArticles/fetchArticles';
