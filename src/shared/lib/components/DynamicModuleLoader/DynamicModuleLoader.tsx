import { ReduxStoreWithReducerManager, StateSchema, StateSchemaKeys } from '@/app/providers/StoreProvider';
import { Reducer } from '@reduxjs/toolkit';
import { ReactNode, useEffect } from 'react';
import { useStore } from 'react-redux';
import { useAppDispatch } from '../../hooks/useAppDispatch/useAppDispatch';

export type ReducersList = {
    [name in StateSchemaKeys]?: Reducer<NonNullable<StateSchema[name]>>;
};
interface DynamicModuleLoaderProps {
    children: ReactNode;
    reducers: ReducersList;
    removeAfterUnmount?: boolean;
}

export const DynamicModuleLoader = (props: DynamicModuleLoaderProps) => {
    const { reducers, removeAfterUnmount = true } = props;
    const dispatch = useAppDispatch();
    const store = useStore() as ReduxStoreWithReducerManager;
    useEffect(() => {
        const mountedReducers = store.reducerManager.getMountedReducers();
        Object.entries(reducers).forEach(([name, reducer]) => {
            const mounted = mountedReducers[name as StateSchemaKeys];
            if (!mounted) {
                store.reducerManager.add(name as StateSchemaKeys, reducer);
                dispatch({ type: `@INIT ${name} reducer` });
            }
        });

        return () => {
            if (removeAfterUnmount) {
                Object.entries(reducers).forEach(([name, reducer]) => {
                    store.reducerManager.remove(name as StateSchemaKeys);
                    dispatch({ type: `@DESTROY ${name} reducer` });
                });
            }
        };
        // eslint-disable-next-line
    }, []);
    const { children } = props;
    return (
        // eslint-disable-next-line react/jsx-no-useless-fragment
        <>{children}</>
    );
};
