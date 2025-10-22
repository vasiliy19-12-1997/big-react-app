import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider/config/StateSchema';
import { Commentary } from '@/entities/Сommentary';

export const fetchCommentsByArticleId = createAsyncThunk<Commentary[], string | undefined, ThunkConfig<string>>(
    'ArticleDetailsCommentSlice/fetchCommentsByArticleId',
    async (articleid, thunkApi) => {
        const { extra, rejectWithValue } = thunkApi;
        if (!articleid) {
            rejectWithValue('Ошибка нету id comment');
        }
        try {
            const response = await extra.api.get<Commentary[]>('/comments', {
                params: {
                    articleid,
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
