import { EntityState } from '@reduxjs/toolkit';
import { Article, ArticleViews } from '@/entities/Article';
import { ArticleSortField, ArticleType } from '@/entities/Article/model/types/artcile';
import { SortOrder } from '@/shared/types';

export interface ArticlePageSchema extends EntityState<Article>{
    isLoading?:boolean,
    error?:string,
    view:ArticleViews,
    limit:number,
    page:number,
    hasMore:boolean,
    _inited:boolean,
    // filter and sort
    sort:ArticleSortField,
    order:SortOrder,
    search:string
    type:ArticleType
}
