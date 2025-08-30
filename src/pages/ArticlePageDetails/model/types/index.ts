import { ArticleDetailsCommentSchema } from './ArticleDetailsCommentSchema';
import { ArticleDetailsRecommendSchema } from './ArticleDetailsRecommendSchema';

export interface ArticlePageDetailsSchema {
    recommends:ArticleDetailsRecommendSchema,
    comments:ArticleDetailsCommentSchema,
}
