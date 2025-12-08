import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/shared/config/state';
import { Article } from '../types/artcile';

export const fetchArticleById = createAsyncThunk<Article, string | undefined, ThunkConfig<string>>(
    'articleDetails/fetchArticleById',
    async (id, thunkApi) => {
        const { extra, rejectWithValue } = thunkApi;
        try {
            if (!id) {
                throw new Error('Произошла ошибка при загрузки статьи');
            }
            const response = await extra.api.get<Article>(`/articles/${id}`, {
                params: {
                    _expand: 'user',
                },
            });
            if (!response) {
                throw new Error('Произошла ошибка уровни фичи');
            }
            return response.data;
        } catch (error) {
            return rejectWithValue(error as string);
        }
    },
);
