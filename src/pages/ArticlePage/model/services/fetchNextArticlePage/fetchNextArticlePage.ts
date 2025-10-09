import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider/config/StateSchema';
import {
    getArticlesIsLoading, getArticlesPageHasMore,
    getArticlesPageNumber,
} from '../../selectors/articles';
import { articlePageActions } from '../../slice/articlePageSlice';
import { fetchArticles } from '../fetchArticles/fetchArticles';

export const fetchNextArticlePage = createAsyncThunk<void, void, ThunkConfig<string>>(
    'articlesPage/fetchNextArticlesPage',
    async (_, thunkApi) => {
        const { getState, dispatch } = thunkApi;
        const hasMore = getArticlesPageHasMore(getState());
        const isLoading = getArticlesIsLoading(getState());
        const page = getArticlesPageNumber(getState());
        if (hasMore && !isLoading) {
            dispatch(articlePageActions.setPage(page + 1));
            dispatch(fetchArticles({}));
        }
    },
);
