import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider/config/StateSchema';
import {
    Article, getFilterSelectorOrder, getFilterSelectorSearch, getFilterSelectorSort,
} from 'entities/Article';
import { getArticlesPageLimit, getArticlesPageNumber } from '../../selectors/articles';

interface fetchArticlesProps {
    replace?:boolean
}
export const fetchArticles = createAsyncThunk<Article[], fetchArticlesProps, ThunkConfig<string>>(
    'ArticlePageSlice/fetchArticles',
    async (props, thunkApi) => {
        const { extra, rejectWithValue, getState } = thunkApi;
        const limit = getArticlesPageLimit(getState());
        const sort = getFilterSelectorSort(getState());
        const order = getFilterSelectorOrder(getState());
        const search = getFilterSelectorSearch(getState());
        const page = getArticlesPageNumber(getState());

        try {
            const response = await extra.api.get<Article[]>('/articles', {
                params: {
                    _expand: 'user',
                    _page: page,
                    _limit: limit,
                    _sort: sort,
                    _order: order,
                    _q: search,
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
