import { createAsyncThunk } from '@reduxjs/toolkit';
import { getArticleDetailsData } from '@/entities/Article';
import { getAuthUserData } from '@/entities/User';
import { fetchCommentsByArticleId } from './fetchCommentsByArticleId';
import { ThunkConfig } from '@/shared/config/state';

export const addCommentForArticle = createAsyncThunk<Comment, string, ThunkConfig<string>>(
    'ArticlePageDetails/addCommentForArticle',
    async (text, thunkApi) => {
        const {
            extra, dispatch, rejectWithValue, getState,
        } = thunkApi;
        const userData = getAuthUserData(getState());
        const article = getArticleDetailsData(getState());
        if (!text || !userData || !article) {
            return rejectWithValue('Ошибка при получение стейта text || userData || article');
        }
        try {
            const response = await extra.api.post<Comment>('/comments', {
                text,
                articleId: article.id,
                userId: userData.id,
            });

            if (!response.data) {
                throw new Error();
            }
            dispatch(fetchCommentsByArticleId(article.id));

            return response.data;
        } catch (error) {
            return rejectWithValue('error');
        }
    },
);
