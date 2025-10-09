import {
    createEntityAdapter,
    createSlice,
    PayloadAction,
} from '@reduxjs/toolkit';
import { StateSchema } from '@/app/providers/StoreProvider';
import { Article, ArticleViews } from '@/entities/Article';
import { ArticleSortField, ArticleType } from '@/entities/Article/model/types/artcile';
import { ARTICLE_VIEWS_LOCALSTORAGE_KEY } from '@/shared/const/localstorage';
import { SortOrder } from '@/shared/types';
import { fetchArticles } from '../../model/services/fetchArticles/fetchArticles';
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
        _inited: false,
        limit: 1,
        order: 'asc',
        search: '',
        sort: ArticleSortField.VIEWS,
        type: ArticleType.ALL,
    }),
    reducers: {
        setView: (state, action:PayloadAction<ArticleViews>) => {
            state.view = action.payload;
            localStorage.setItem(ARTICLE_VIEWS_LOCALSTORAGE_KEY, action.payload);
        },
        setPage: (state, action:PayloadAction<number>) => {
            state.page = action.payload;
        },
        setOrder: (state, action:PayloadAction<SortOrder>) => {
            state.order = action.payload;
        },
        setSort: (state, action:PayloadAction<ArticleSortField>) => {
            state.sort = action.payload;
        },
        setSearch: (state, action:PayloadAction<string>) => {
            state.search = action.payload;
        },
        setType: (state, action:PayloadAction<ArticleType>) => {
            state.type = action.payload;
        },
        initState: (state) => {
            const view = localStorage.getItem(ARTICLE_VIEWS_LOCALSTORAGE_KEY) as ArticleViews;
            state.view = view;
            state.limit = view === ArticleViews.BIG ? 4 : 9;
            state._inited = true;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchArticles.pending, (state, action) => {
                state.error = undefined;
                state.isLoading = true;
                if (action.meta.arg.replace) {
                    articleAdapter.removeAll(state);
                }
            })
            .addCase(fetchArticles.fulfilled, (state, action) => {
                state.isLoading = false;
                state.hasMore = action.payload.length >= state.limit;
                if (action.meta.arg.replace) {
                    articleAdapter.setAll(state, action.payload);
                } else {
                    articleAdapter.addMany(state, action.payload);
                }
            })
            .addCase(fetchArticles.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});
export const { reducer: articlesReducer, actions: articlePageActions } = ArticlePageSlice;
