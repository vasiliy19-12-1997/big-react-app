export type { ArtcileTypeBlocks, Article } from './model/types/artcile';
export type { ArticleDetailsSchema } from './model/types/articleDetailsSchema';
export { ArtcileDetails } from './ui/ArtcileDetails/ArticleDetails';

export { ArticleSortField, ArticleView as ArticleViews, ArticleType } from '@/entities/Article/model/types/artcile';
export { ArticleList } from '@/entities/Article/ui/ArticleList/ArticleList';
export { getArticleDetailsData } from './model/selectors/getArticleDetails';
export { articleDetailsActions } from './model/slice/artcileDetailsSlice';
export { fetchArticleById } from './model/services/fetchArticleById';
export { ArticleBlockType } from './model/types/artcile';
