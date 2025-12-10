import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/shared/config/state';
import {
    Article, ArticleSortField, getFilterSelectorOrder, getFilterSelectorSearch, getFilterSelectorSort,
    ArticleType,
} from '@/entities/Article';
import { SortOrder } from '@/shared/types/sort';
import { addQueryParams } from '@/shared/lib/url/addQueryParams/addQueryParams';

import { getArticlesPageLimit, getArticlesPageNumber, getArticlesPageType } from '../../selectors/articles';

interface fetchArticlesProps {
    replace?:boolean
}
type ArticlesQuery = {
    _expand?:'user',
    _page?:number,
    _limit?:number,
    _sort:ArticleSortField,
    _order:SortOrder
    q:string
    type:ArticleType | undefined
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
        const type = getArticlesPageType(getState());
        const params: ArticlesQuery = {
            _expand: 'user',
            _page: page,
            _limit: limit,
            _sort: sort,
            _order: order,
            q: search,
            type: type === ArticleType.ALL ? undefined : type,
        };
        try {
            addQueryParams({
                sort, order, search, type,
            });
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
