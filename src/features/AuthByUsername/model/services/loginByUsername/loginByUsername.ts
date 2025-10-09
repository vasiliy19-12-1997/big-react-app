import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig, ThunkExtraArg } from '@/app/providers/StoreProvider/config/StateSchema';
import axios from 'axios';
import { User, userActions } from '@/entities/User';
import { USER_LOCALSTORAGE_KEY } from '@/shared/const/localstorage';

interface loginByUsernameProps{
    username:string;
    password:string
}
enum LoginErrors{
    INCORRECT_DATA = '',
    SERVER_ERROD = ''
}
export const loginByUsername = createAsyncThunk<User, loginByUsernameProps, ThunkConfig<string>>(
    'login/loginByUsername',
    async (authData, thunkApi) => {
        const { extra, dispatch, rejectWithValue } = thunkApi;
        try {
            const response = await extra.api.post<User>('/login', authData);

            if (!response.data) {
                throw new Error();
            }
            // extra.navigate('./about');
            localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(response.data));
            dispatch(userActions.setAuthData(response.data));
            return response.data;
        } catch (error) {
            console.log(error);
            return rejectWithValue('error');
        }
    },
);
