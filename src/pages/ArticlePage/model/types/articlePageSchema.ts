import { EntityState } from '@reduxjs/toolkit';
import { Article, ArticleViews, ArticleSortField, ArticleType } from '@/entities/Article';

import { SortOrder } from '@/shared/types/sort';

export interface ArticlePageSchema extends EntityState<Article> {
    isLoading?: boolean;
    error?: string;
    view: ArticleViews;
    limit: number;
    page: number;
    hasMore: boolean;
    _inited: boolean;
    // filter and sort
    sort: ArticleSortField;
    order: SortOrder;
    search: string;
    type: ArticleType;
}
