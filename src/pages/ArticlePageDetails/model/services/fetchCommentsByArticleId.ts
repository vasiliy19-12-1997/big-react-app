import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/shared/config/state';
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

            if (!response.data) {
                throw new Error('Произошла ошибка на уровне подгрузки комментариев');
            }

            return response.data;
            
        } catch (error) {
            return rejectWithValue(error as string);
        }
    },
);
