import {
    configureStore, DeepPartial, getDefaultMiddleware, ReducersMapObject,
} from '@reduxjs/toolkit';
import { counterReducers } from 'entities/Counter';
import { userReducer } from 'entities/User';
import { $api } from 'shared/config/api/api';
import { NavigateOptions, To } from 'react-router-dom';
import { StateSchema } from './StateSchema';
import { createReducerManager } from './ReducerManager';

export function createReduxStore(
    initialState?:StateSchema,
    asyncReducers?:ReducersMapObject<StateSchema>,
    navigate?:(to: To, options?: NavigateOptions)=>void,
) {
    const rootReducers:ReducersMapObject<StateSchema> = {
        ...asyncReducers,
        counter: counterReducers,
        user: userReducer,
    };
    const reducerManager = createReducerManager(rootReducers);
    const store = configureStore({
        reducer: reducerManager.reduce,
        devTools: __IS_DEV__,
        preloadedState: initialState,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware({
            thunk: {
                extraArgument: {
                    api: $api,
                    navigate,
                },
            },

        }),
    });
    // @ts-ignore
    store.reducerManager = reducerManager;
    return store;
}
export type StateSchemaKeys = keyof StateSchema;

export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch'];
