import { combineReducers } from '@reduxjs/toolkit';
import { ArticlePageDetailsSchema } from '../types';
import { articleDetailsCommentsReducer } from '../slice/ArticleDetailsCommentSlice';
import { articleRecommendationReducer } from '../slice/ArticleDetailsRecommendSlice';

export const articleDetailsReducer = combineReducers<ArticlePageDetailsSchema>({
    comments: articleDetailsCommentsReducer,
    recommends: articleRecommendationReducer,
});
