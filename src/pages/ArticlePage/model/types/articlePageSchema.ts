import { EntityState } from '@reduxjs/toolkit';
import { Article, ArticleViews } from 'entities/Article';

export interface ArticlePageSchema extends EntityState<Article>{
    isLoading?:boolean,
    error?:string,
    view:ArticleViews
}
