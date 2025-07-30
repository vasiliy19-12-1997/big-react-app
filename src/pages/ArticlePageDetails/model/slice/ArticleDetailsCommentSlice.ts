import {
    createEntityAdapter,
    createSlice,
} from '@reduxjs/toolkit';
import { StateSchema } from 'app/providers/StoreProvider';
import { Commentary } from 'entities/Сommentary';
import { ArticleDetailsCommentSchema } from '../types/ArticleDetailsCommentSchema';

// Since we don't provide `selectId`, it defaults to assuming `entity.id` is the right field
const commentsAdapter = createEntityAdapter<Commentary>({
    selectId: (comment) => comment.id,

});
const getArticleComments = commentsAdapter.getSelectors<StateSchema>((state) => state.articleDetailsComments || commentsAdapter.getInitialState());
const articleDetailsSlice = createSlice({
    name: 'articleDetailsSlice',
    initialState: commentsAdapter.getInitialState<ArticleDetailsCommentSchema>({
        isLoading: false,
        error: undefined,
        ids: [],
        entities: {},
    }),
    reducers: {

    },
});
