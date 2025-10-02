import { StoreProvider } from './ui/StoreProvider';
import { createReduxStore, AppDispatch } from './config/store';
import type { ReduxStoreWithReducerManager, StateSchema } from './config/StateSchema';

export type {

    createReduxStore,
    StateSchema,
    ReduxStoreWithReducerManager,
    AppDispatch,
};
export { StoreProvider };
