import { EntityState } from '@reduxjs/toolkit';
import { Commentary } from '@/entities/Сommentary';

export interface ArticleDetailsCommentSchema extends EntityState<Commentary>{
    error?:string
    isLoading?:boolean
}
