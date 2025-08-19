import {
    createSlice,
    PayloadAction,
} from '@reduxjs/toolkit';
import { ScrollRestorationSchema } from '../types/scrollRestoration';

const initialState:ScrollRestorationSchema = {
    scroll: {},
};

const scrollRestorationSlice = createSlice({
    name: 'scrollRestorationSlice',
    initialState,
    reducers: {
        // articles = 500
        setScrollPosition: (state, { payload }: PayloadAction<{path:string, position:number}>) => {
            state.scroll[payload.path] = payload.position;
        },
    },

});

export const {
    reducer: scrollRestorationSliceReducer,
    actions: scrollRestorationSliceActions,
} = scrollRestorationSlice;
