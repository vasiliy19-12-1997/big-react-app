import { configureStore } from '@reduxjs/toolkit';
import { counterReducers } from 'entities/Counter';
import { StateSchema } from './StateSchema';

export function createReduxStore(initialState?:StateSchema) {
    return configureStore<StateSchema>({
        reducer: {
            counter: counterReducers,
        },
        devTools: __IS_DEV__,
        preloadedState: initialState,
    });
}
