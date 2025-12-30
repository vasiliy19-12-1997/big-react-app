import { createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { StateSchema } from '@/app/providers/StoreProvider';
import { Article } from '@/entities/Article';
import { ArticleDetailsRecommendSchema } from '../types/ArticleDetailsRecommendSchema';
import { fetchArticlesRecommends } from '../services/fetchArticlesRecommends';

const recommendAdapter = createEntityAdapter<Article>({
    selectId: (article) => article.id,
});

export const getRecommend = recommendAdapter.getSelectors<StateSchema>(
    (state) => state.articlePageDetails?.recommends || recommendAdapter.getInitialState(),
);

const RecommendSlice = createSlice({
    name: 'RecommendSlice',
    initialState: recommendAdapter.getInitialState<ArticleDetailsRecommendSchema>({
        isLoading: false,
        error: undefined,
        ids: ['1', '2'],
        entities: {},
    }),
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchArticlesRecommends.pending, (state) => {
                state.isLoading = true;
                state.error = undefined;
            })
            .addCase(fetchArticlesRecommends.fulfilled, (state, action: PayloadAction<Article[]>) => {
                state.isLoading = false;
                recommendAdapter.setAll(state, action.payload);
            })
            .addCase(fetchArticlesRecommends.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            });
    },
});

export const { reducer: articleRecommendationReducer, actions: articleRecommendationAction } = RecommendSlice;
