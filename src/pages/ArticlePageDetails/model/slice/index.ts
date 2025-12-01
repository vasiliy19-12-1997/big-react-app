import { combineReducers } from '@reduxjs/toolkit';
import { ArticlePageDetailsSchema } from '../types';
import { articleDetailsCommentsReducer } from './ArticleDetailsCommentSlice';
import { articleRecommendationReducer } from './ArticleDetailsRecommendSlice';

export const articlePageDetailsReducer = combineReducers<ArticlePageDetailsSchema>({
    recommends: articleRecommendationReducer,
    comments: articleDetailsCommentsReducer,
});
