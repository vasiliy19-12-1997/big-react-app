import {
    AnyAction, CombinedState, Dispatch, EnhancedStore, Reducer, ReducersMapObject,
} from '@reduxjs/toolkit';
import { CounterSchema } from 'entities/Counter';
import { UserSchema } from 'entities/User';
import { LoginSchema } from 'features/AuthByUsername';
import { ProfileSchema } from 'entities/Profile';
import { NavigateOptions, To } from 'react-router-dom';
import { AxiosInstance } from 'axios';

import { ArticleDetailsSchema } from 'entities/Article';
import { StateSchemaKeys } from './store';

export interface StateSchema{
    counter:CounterSchema,
    user:UserSchema,
    // асинхронные редюсеры
    login?:LoginSchema,
    profile?:ProfileSchema
    articles?:ArticleDetailsSchema
}
export interface ReducerManagerProps{
    getReducerMap:()=>ReducersMapObject<StateSchema>;
    reduce:(state:StateSchema, action:AnyAction)=>CombinedState<StateSchema>;
    add:(key:StateSchemaKeys, reducer:Reducer)=>void;
    remove:(key:StateSchemaKeys)=>void
}
export interface ReduxStoreWithReducerManager extends EnhancedStore<StateSchema>{
    reducerManager:ReducerManagerProps;
}

export interface ThunkExtraArg{
    api:AxiosInstance,
    navigate?:(to: To, options?: NavigateOptions)=>void,
}
export interface ThunkConfig<T>{
 extra:ThunkExtraArg,
 rejectValue:T,
 state:StateSchema
}
