import {
    AnyAction, CombinedState,
    EnhancedStore, Reducer, ReducersMapObject,
} from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { ArticleDetailsSchema } from 'entities/Article';
import { CounterSchema } from 'entities/Counter';
import { ProfileSchema } from 'entities/Profile';
import { UserSchema } from 'entities/User';
import { AddCommentFormTypes } from 'features/AddCommentForm';
import { LoginSchema } from 'features/AuthByUsername';
import { ArticlePageSchema } from 'pages/ArticlePage';
import { ArticleDetailsCommentSchema } from 'pages/ArticlePageDetails';
import { StateSchemaKeys } from './store';

export interface StateSchema{
    counter:CounterSchema,
    user:UserSchema,
    // асинхронные редюсеры
    login?:LoginSchema,
    profile?:ProfileSchema
    articles?:ArticleDetailsSchema
    articleDetailsComments?:ArticleDetailsCommentSchema
    addCommentForm?:AddCommentFormTypes
    articlePage?:ArticlePageSchema
}
export type MountedReducers = OptionalRecord<StateSchemaKeys, boolean>
export interface ReducerManagerProps{
    getReducerMap:()=>ReducersMapObject<StateSchema>;
    reduce:(state:StateSchema, action:AnyAction)=>CombinedState<StateSchema>;
    add:(key:StateSchemaKeys, reducer:Reducer)=>void;
    remove:(key:StateSchemaKeys)=>void
    getMountedReducers:()=>MountedReducers
}
export interface ReduxStoreWithReducerManager extends EnhancedStore<StateSchema>{
    reducerManager:ReducerManagerProps;
}

export interface ThunkExtraArg{
    api:AxiosInstance,
}
export interface ThunkConfig<T>{
 extra:ThunkExtraArg,
 rejectValue:T,
 state:StateSchema
}
