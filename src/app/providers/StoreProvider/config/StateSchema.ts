import { AnyAction, CombinedState, EnhancedStore, Reducer, ReducersMapObject } from '@reduxjs/toolkit';
import { ArticleDetailsSchema } from '@/entities/Article';
import { CounterSchema } from '@/entities/Counter';
import { ProfileSchema } from '@/entities/Profile';
import { UserSchema } from '@/entities/User';
import { AddCommentFormTypes } from '@/features/AddCommentForm';
import { LoginSchema } from '@/features/AuthByUsername';
import { ScrollRestorationSchema } from '@/features/ScrollRestoration';
import { ArticlePageSchema } from '@/pages/ArticlePage';
import { ArticlePageDetailsSchema } from '@/pages/ArticlePageDetails';
import { rtqApi } from '@/shared/config/api/rtqApi';
import { StateSchemaKeys } from './store';

export interface StateSchema {
    counter: CounterSchema;
    user: UserSchema;
    scrollRestoration: ScrollRestorationSchema;
    [rtqApi.reducerPath]: ReturnType<typeof rtqApi.reducer>;
    // асинхронные редюсеры
    login?: LoginSchema;
    profile?: ProfileSchema;
    articlePage?: ArticlePageSchema;
    articlesDetails?: ArticleDetailsSchema;
    articlePageDetails?: ArticlePageDetailsSchema;
    addCommentForm?: AddCommentFormTypes;
}
export type MountedReducers = OptionalRecord<StateSchemaKeys, boolean>;
export interface ReducerManagerProps {
    getReducerMap: () => ReducersMapObject<StateSchema>;
    reduce: (state: StateSchema, action: AnyAction) => CombinedState<StateSchema>;
    add: (key: StateSchemaKeys, reducer: Reducer) => void;
    remove: (key: StateSchemaKeys) => void;
    getMountedReducers: () => MountedReducers;
}
export interface ReduxStoreWithReducerManager extends EnhancedStore<StateSchema> {
    reducerManager: ReducerManagerProps;
}
