export { ArticlePageDetailsAsync as ArticlePageDetails } from './ui/ArticlePageDetails/ArticlePageDetails.async';

export type { ArticleDetailsCommentSchema } from './model/types/ArticleDetailsCommentSchema';
export type { ArticleDetailsRecommendSchema } from './model/types/ArticleDetailsRecommendSchema';
export type { ArticlePageDetailsSchema } from './model/types/index';
export { articleRecommendationReducer as recommendSliceReducer } from './model/slice/ArticleDetailsRecommendSlice';
export {
    getArticleDetailsCommentsIsLoading,
    getArticleDetailsCommentsError,
} from './model/selectors/comments/comments';
export {
    getArticleDetailsRecommendError,
    getArticleDetailsRecommendIsLoading,
} from './model/selectors/recommends/recommends';
export { getCanEditArticles } from './model/selectors/articles/articles';
export { articleDetailsReducer } from './model/selectors/index';
export { addCommentForArticle } from './model/services/addCommentForArticle';
export { fetchArticlesRecommends } from './model/services/fetchArticlesRecommends';
export { fetchCommentsByArticleId } from './model/services/fetchCommentsByArticleId';
export { getArticleComments } from './model/slice/ArticleDetailsCommentSlice';
