import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider/config/StateSchema';
import {
    Article,
} from '@/entities/Article';

type RecommendsQuery = {
    _limit?:number,
}

export const fetchArticlesRecommends = createAsyncThunk<Article[], void, ThunkConfig<string>>(
    'ArticlePageDetails/fetchArticlesRecommends',
    async (props, thunkApi) => {
        const { extra, rejectWithValue, getState } = thunkApi;
        const params: RecommendsQuery = {
            _limit: 4,
        };
        try {
            const response = await extra.api.get<Article[]>('/articles', {
                params,
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
