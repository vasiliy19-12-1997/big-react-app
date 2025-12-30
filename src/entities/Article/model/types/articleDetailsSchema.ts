import { Article } from './artcile';

export interface ArticleDetailsSchema {
    data?: Article;
    isLoading?: boolean;
    error?: string;
}
