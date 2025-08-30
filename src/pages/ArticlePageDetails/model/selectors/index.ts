import { combineReducers } from '@reduxjs/toolkit';
import { ArticlePageDetailsSchema } from '../types';
import { articleDetailsCommentsReducer } from '../slice/ArticleDetailsCommentSlice';
import { recommendSliceReducer } from '../slice/ArticleDetailsRecommendSlice';

export const articleDetailsReducer = combineReducers<ArticlePageDetailsSchema>({
    comments: articleDetailsCommentsReducer,
    recommends: recommendSliceReducer,
});
