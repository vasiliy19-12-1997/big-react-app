import { bindActionCreators, createSlice, CreateSliceOptions, SliceCaseReducers } from '@reduxjs/toolkit';
import { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { useAppDispatch } from '../hooks/useAppDispatch/useAppDispatch';

export function buildSlice<State, CaseReducers extends SliceCaseReducers<State>, Name extends string = string>(
    options: CreateSliceOptions<State, CaseReducers, Name>,
) {
    const slice = createSlice(options);

    const useActons = (): typeof slice.actions => {
        const dispatch = useAppDispatch();
        // @ts-ignore
        return useMemo(() => bindActionCreators(slice.actions, dispatch), [dispatch]);
    };
    return {
        ...slice,
        useActons,
    };
}
