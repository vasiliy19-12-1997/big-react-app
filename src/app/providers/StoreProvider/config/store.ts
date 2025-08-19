import {
    CombinedState,
    configureStore,
    Reducer,
    ReducersMapObject,
} from '@reduxjs/toolkit';
import { counterReducers } from 'entities/Counter';
import { userReducer } from 'entities/User';
import { scrollRestorationSliceReducer } from 'features/ScrollRestoration';
import { $api } from 'shared/config/api/api';
import { createReducerManager } from './ReducerManager';
import { StateSchema } from './StateSchema';

export function createReduxStore(
    initialState?:StateSchema,
    asyncReducers?:ReducersMapObject<StateSchema>,
) {
    const rootReducers:ReducersMapObject<StateSchema> = {
        ...asyncReducers,
        counter: counterReducers,
        user: userReducer,
        scrollRestoration: scrollRestorationSliceReducer,
    };
    const reducerManager = createReducerManager(rootReducers);

    const store = configureStore({
        reducer: reducerManager.reduce as Reducer<CombinedState<StateSchema>>,
        devTools: __IS_DEV__,
        preloadedState: initialState,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware({
            thunk: {
                extraArgument: {
                    api: $api,
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
