import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/shared/config/state';
import { SortOrder } from '@/shared/types';
import { ArticleSortField, ArticleType } from '@/entities/Article';
import {
    getArticlesPageInited,
} from '../../selectors/articles';
import { articlePageActions } from '../../slice/articlePageSlice';
import { fetchArticles } from '../fetchArticles/fetchArticles';

export const ininArticlePage = createAsyncThunk<void, URLSearchParams, ThunkConfig<string>>(
    'articlesPage/ininArticlePage',
    async (searchParams, thunkApi) => {
        const { getState, dispatch } = thunkApi;
        const inited = getArticlesPageInited(getState());
        const orderFromUrl = searchParams.get('order') as SortOrder;
        const sortFromUrl = searchParams.get('sort') as ArticleSortField;
        const searchFromUrl = searchParams.get('search');
        const searchFromType = searchParams.get('type') as ArticleType;

        if (orderFromUrl) {
            dispatch(articlePageActions.setOrder(orderFromUrl));
        }
        if (sortFromUrl) {
            dispatch(articlePageActions.setSort(sortFromUrl));
        }
        if (searchFromUrl) {
            dispatch(articlePageActions.setSearch(searchFromUrl));
        }
        if (searchFromType) {
            dispatch(articlePageActions.setType(searchFromType));
        }

        if (!inited) {
            dispatch(articlePageActions.initState());
            dispatch(fetchArticles({ replace: false }));
        }
    },
);
