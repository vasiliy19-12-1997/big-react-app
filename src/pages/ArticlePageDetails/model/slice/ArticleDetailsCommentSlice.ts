import {
    createEntityAdapter,
    createSlice,
    PayloadAction,
} from '@reduxjs/toolkit';
import { StateSchema } from '@/app/providers/StoreProvider';
import { Commentary } from '@/entities/Сommentary';
import { ArticleDetailsCommentSchema } from '../types/ArticleDetailsCommentSchema';
import { fetchCommentsByArticleId } from '../services/fetchCommentsByArticleId';

// Since we don't provide `selectId`, it defaults to assuming `entity.id` is the right field
const commentsAdapter = createEntityAdapter<Commentary>({
    selectId: (comment) => comment.id,

});
export const getArticleComments = commentsAdapter.getSelectors<StateSchema>((state) => state.articlePageDetails?.comments
|| commentsAdapter.getInitialState());

const ArticleDetailsCommentSlice = createSlice({
    name: 'ArticleDetailsCommentSlice',
    initialState: commentsAdapter.getInitialState<ArticleDetailsCommentSchema>({
        isLoading: false,
        error: undefined,
        ids: [],
        entities: {},
    }),
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCommentsByArticleId.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(fetchCommentsByArticleId.fulfilled, (state, action:PayloadAction<Commentary[]>) => {
                state.isLoading = false;
                commentsAdapter.setAll(state, action.payload);
            })
            .addCase(fetchCommentsByArticleId.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});
export const { reducer: articleDetailsCommentsReducer } = ArticleDetailsCommentSlice;
