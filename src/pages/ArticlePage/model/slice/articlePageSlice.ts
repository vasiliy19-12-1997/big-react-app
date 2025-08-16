import {
    createEntityAdapter,
    createSlice,
    PayloadAction,
} from '@reduxjs/toolkit';
import { StateSchema } from 'app/providers/StoreProvider';
import { Article, ArticleViews } from 'entities/Article';
import { fetchArticles } from 'pages/ArticlePage/model/services/fetchArticles/fetchArticles';
import { ARTICLE_VIEWS_LOCALSTORAGE_KEY } from 'shared/const/localstorage';
import { ArticlePageSchema } from '../types/articlePageSchema';

// Since we don't provide `selectId`, it defaults to assuming `entity.id` is the right field
const articleAdapter = createEntityAdapter<Article>({
    selectId: (article) => article.id,
});
export const getArticles = articleAdapter.getSelectors<StateSchema>((state) => state.articlePage || articleAdapter.getInitialState());
const ArticlePageSlice = createSlice({
    name: 'ArticlePageSlice',
    initialState: articleAdapter.getInitialState<ArticlePageSchema>({
        isLoading: false,
        error: undefined,
        ids: ['1', '2'],
        entities: {},
        view: ArticleViews.SMALL,
        page: 1,
        hasMore: true,
    }),
    reducers: {
        setView: (state, action:PayloadAction<ArticleViews>) => {
            state.view = action.payload;
            localStorage.setItem(ARTICLE_VIEWS_LOCALSTORAGE_KEY, action.payload);
        },
        setPage: (state, action:PayloadAction<number>) => {
            state.page = action.payload;
        },
        initState: (state) => {
            const view = localStorage.getItem(ARTICLE_VIEWS_LOCALSTORAGE_KEY) as ArticleViews;
            state.view = view;
            // debugger;
            state.limit = view === ArticleViews.BIG ? 4 : 9;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchArticles.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(fetchArticles.fulfilled, (state, action:PayloadAction<Article[]>) => {
                state.isLoading = false;
                articleAdapter.addMany(state, action.payload);
                state.hasMore = action.payload.length > 0;
            })
            .addCase(fetchArticles.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});
export const { reducer: articlesReducer, actions: articlePageActions } = ArticlePageSlice;
