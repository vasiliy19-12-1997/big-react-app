import {
    AnyAction,
    combineReducers, Reducer, ReducersMapObject,
} from '@reduxjs/toolkit';
import { StateSchema } from '@/app/providers/StoreProvider';
import { StateSchemaKeys } from './store';
import { MountedReducers } from './StateSchema';

export function createReducerManager(initialReducers:ReducersMapObject<StateSchema>) {
    const reducers = { ...initialReducers };

    let combinedReducer = combineReducers(reducers);
    let keysToRemove:Array<StateSchemaKeys> = [];
    const mountedReducers:MountedReducers = {};
    return {
        getReducerMap: () => reducers,
        getMountedReducers: () => mountedReducers,
        reduce: (state:StateSchema, action:AnyAction) => {
            if (keysToRemove.length > 0) {
                state = { ...state };
                keysToRemove.forEach((key) => {
                    delete state[key];
                });
                keysToRemove = [];
            }
            return combinedReducer(state, action);
        },
        add: (key:StateSchemaKeys, reducer:Reducer) => {
            if (!key || reducers[key]) {
                return;
            }
            reducers[key] = reducer;
            mountedReducers[key] = true;
            combinedReducer = combineReducers(reducers);
        },
        remove: (key:StateSchemaKeys) => {
            if (!key || !reducers[key]) {
                return;
            }
            mountedReducers[key] = false;
            delete reducers[key];
            keysToRemove.push(key);
            combinedReducer = combineReducers(reducers);
        },
    };
}
