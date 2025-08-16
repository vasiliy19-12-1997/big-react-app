import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider/config/StateSchema';
import { Article } from 'entities/Article';
import { getArticlesPageLimit } from '../../selectors/articles';

interface fetchArticlesProps {
    page?:number
}
export const fetchArticles = createAsyncThunk<Article[], fetchArticlesProps, ThunkConfig<string>>(
    'ArticlePageSlice/fetchArticles',
    async (props, thunkApi) => {
        const { extra, rejectWithValue, getState } = thunkApi;
        const { page = 1 } = props;
        const limit = getArticlesPageLimit(getState());
        try {
            const response = await extra.api.get<Article[]>('/articles', {
                params: {
                    _expand: 'user',
                    _page: page,
                    _limit: limit,
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
