import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/shared/config/state';
import { Commentary } from '@/entities/Сommentary';

export const fetchCommentsByArticleId = createAsyncThunk<Commentary[], string | undefined, ThunkConfig<string>>(
    'ArticleDetailsCommentSlice/fetchCommentsByArticleId',
    async (articleId, thunkApi) => {
        const { extra, rejectWithValue } = thunkApi;
        if (!articleId) {
            return rejectWithValue('Ошибка нету id comment');
        }
        try {
            const response = await extra.api.get<Commentary[]>('/comments', {
                params: {
                    articleId,
                    _expand: 'user',
                },
            });
            if (!response) {
                throw new Error('Произошла ошибка на уровне подгрузе комментариев');
            }
            return response.data;
        } catch (error) {
            return rejectWithValue(error as string);
        }
    },
);
