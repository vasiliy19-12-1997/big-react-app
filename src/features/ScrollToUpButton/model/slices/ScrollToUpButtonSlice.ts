import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ScrollToUpButtonSchema } from '../types/ScrollToUpButtonSchema';

const initialState: ScrollToUpButtonSchema = {
    
};

export const ScrollToUpButtonSlice = createSlice({
    name: 'ScrollToUpButton',
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

export const { actions: ScrollToUpButtonActions } = ScrollToUpButtonSlice;
export const { reducer: ScrollToUpButtonReducer } = ScrollToUpButtonSlice;