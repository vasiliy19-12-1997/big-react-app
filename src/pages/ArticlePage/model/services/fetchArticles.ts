import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider/config/StateSchema';
import { Article } from 'entities/Article';

export const fetchArticles = createAsyncThunk<Article[], string | undefined, ThunkConfig<string>>(
    'ArticlePageSlice/fetchArticles',
    async (articleid, thunkApi) => {
        const { extra, rejectWithValue } = thunkApi;
        if (!articleid) {
            rejectWithValue('Ошибка нету id comment');
        }
        try {
            const response = await extra.api.get<Article[]>('/articles', {
                params: {
                    articleid,
                    _expand: 'user',
                },
            });
            if (!response) {
                throw new Error();
            }
            return response.data;
        } catch (error) {
            return rejectWithValue(error as string);
        }
    },
);
