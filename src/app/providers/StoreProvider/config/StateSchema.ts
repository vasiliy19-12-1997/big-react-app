import {
    AnyAction, CombinedState, EnhancedStore, Reducer, ReducersMapObject,
} from '@reduxjs/toolkit';
import { CounterSchema } from 'entities/Counter';
import { UserSchema } from 'entities/User';
import { LoginSchema } from 'features/AuthByUsername';
import { StateSchemaKeys } from './store';

export interface StateSchema{
    counter:CounterSchema,
    user:UserSchema,
    // асинхронные редюсеры
    login?:LoginSchema,
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
