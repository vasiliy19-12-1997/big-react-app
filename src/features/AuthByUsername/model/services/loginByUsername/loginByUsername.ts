import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/shared/config/state';
import { User, userActions } from '@/entities/User';

interface loginByUsernameProps {
    username: string;
    password: string;
}
enum LoginErrors {
    INCORRECT_DATA = '',
    SERVER_ERROD = '',
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

            dispatch(userActions.setAuthData(response.data));
            return response.data;
        } catch (error) {
            console.log('Ощибка при логине пользователся', error);
            return rejectWithValue('error');
        }
    },
);
