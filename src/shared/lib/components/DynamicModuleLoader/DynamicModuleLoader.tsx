import { Reducer } from '@reduxjs/toolkit';
import { ReduxStoreWithReducerManager } from 'app/providers/StoreProvider';
import { StateSchemaKeys } from 'app/providers/StoreProvider/config/store';
import { ReactNode, useEffect } from 'react';
import { useDispatch, useStore } from 'react-redux';

export type ReducersList = {
    [name in StateSchemaKeys]?:Reducer
}
type ReducersListEntry = [StateSchemaKeys, Reducer]
interface DynamicModuleLoaderProps {
    children:ReactNode
    reducers:ReducersList;
    removeAfterUnmount?:boolean
}

export const DynamicModuleLoader = (props: DynamicModuleLoaderProps) => {
    const {
        reducers,
        removeAfterUnmount,
    } = props;
    const dispatch = useDispatch();
    const store = useStore() as ReduxStoreWithReducerManager;
    useEffect(() => {
        Object.entries(reducers).forEach(([name, reducer]) => {
            store.reducerManager.add(name as StateSchemaKeys, reducer);
            dispatch({ type: `@INIT ${name} reducer` });
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
    const {
        children,
    } = props;
    return (
        // eslint-disable-next-line react/jsx-no-useless-fragment
        <>
            {children}
        </>
    );
};
