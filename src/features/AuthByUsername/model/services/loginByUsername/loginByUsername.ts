import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { User, userActions } from 'entities/User';
import { USER_LOCALSTORAGE_KEY } from 'shared/const/localstorage';

interface loginByUsernameProps{
    username:string;
    password:string
}
enum LoginErrors{
    INCORRECT_DATA = '',
    SERVER_ERROD = ''
}
export const loginByUsername = createAsyncThunk<User, loginByUsernameProps, {rejectValue:string}>(
    'login/loginByUsername',
    async (authData, thunkApi) => {
        try {
            const response = await axios.post<User>('http://localhost:8001/login', authData);
            if (!response.data) {
                throw new Error();
            }
            localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(response.data));
            thunkApi.dispatch(userActions.setAuthData(response.data));
            return response.data;
        } catch (error) {
            console.log(error);
            return thunkApi.rejectWithValue('error');
        }
    },
);
