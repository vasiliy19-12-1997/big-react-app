import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ArticlePageGreetingSchema } from '../types/articlePageGreetingSchema';

const initialState: ArticlePageGreetingSchema = {
    
};

export const articlePageGreetingSlice = createSlice({
    name: 'articlePageGreeting',
    initialState,
    reducers: {
        template: (state, action: PayloadAction<string>) => {
           
        },
    },
    // extraReducers: (builder) => {
    //     builder
    //         .addCase(, (state) => {
    //             state.error = undefined;
    //             state.isLoading = true;
    //         })
    //         .addCase(, (state) => {
    //             state.isLoading = false;
    //         })
    //         .addCase(, (state, action) => {
    //             state.isLoading = false;
    //             state.error = action.payload;
    //         });
    // },
});

export const { actions: articlePageGreetingActions } = articlePageGreetingSlice;
export const { reducer: articlePageGreetingReducer } = articlePageGreetingSlice;