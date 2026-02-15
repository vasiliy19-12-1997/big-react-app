import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/shared/config/state';
import { LOCAL_STORAGE_LAST_DESIGN_KEY, USER_LOCALSTORAGE_KEY } from '@/shared/const/localstorage';
import { getAuthUserDataQuery } from '../api/userApi';
import { User } from '../types/UserSchema';

export const initedAuthData = createAsyncThunk<User, void, ThunkConfig<string>>(
    'User/initedAuthData',
    // eslint-disable-next-line spaced-comment
    //@ts-ignore
    async (_, thunkApi) => {
        const { extra, rejectWithValue, getState, dispatch } = thunkApi;
        const userId = localStorage.getItem(USER_LOCALSTORAGE_KEY);
        if (!userId) {
            return rejectWithValue('Нет userId в локалсторадж');
        }
        try {
            const response = await dispatch(getAuthUserDataQuery(userId)).unwrap();
            localStorage.setItem(LOCAL_STORAGE_LAST_DESIGN_KEY, response.features?.isNewDesignEnabled ? 'new' : 'old');

            if (!response) {
                throw new Error('Произошла ошибка уровни сервиса initedAuthData');
            }
            return response;
        } catch (error) {
            return rejectWithValue(error as string);
        }
    },
);
