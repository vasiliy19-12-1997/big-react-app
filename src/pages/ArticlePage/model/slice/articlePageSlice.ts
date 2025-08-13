import {
    createEntityAdapter,
    createSlice,
    PayloadAction,
} from '@reduxjs/toolkit';
import { StateSchema } from 'app/providers/StoreProvider';
import { Article, ArticleViews } from 'entities/Article';
import { fetchArticles } from 'pages/ArticlePage/model/services/fetchArticles';
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

    }),
    reducers: {
        setView: (state, action:PayloadAction<ArticleViews>) => {
            state.view = action.payload;
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
                articleAdapter.setAll(state, action.payload);
            })
            .addCase(fetchArticles.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});
export const { reducer: articlesReducer, actions: articlePageActions } = ArticlePageSlice;
