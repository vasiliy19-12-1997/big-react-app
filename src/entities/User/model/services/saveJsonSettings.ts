import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/shared/config/state';
import { getAuthUserData } from '../selectors/getAuthUserData';
import { getJsonSettings } from '../selectors/jsonSettings/jsonSettings';
import { setJsonSettingsMutation } from '../api/userApi';
import { JsonSettingsProperties } from '../types/jsonSettings';

export const saveJsonSettings = createAsyncThunk<JsonSettingsProperties, JsonSettingsProperties, ThunkConfig<string>>(
    'User/saveJsonSettings',
    // eslint-disable-next-line spaced-comment
    //@ts-ignore
    async (newSettings, thunkApi) => {
        const { extra, rejectWithValue, getState, dispatch } = thunkApi;
        const userData = getAuthUserData(getState());
        const currentJsonSettings = getJsonSettings(getState());
        if (!userData) {
            return rejectWithValue('Нет данных пользователя');
        }
        try {
            const response = await dispatch(
                setJsonSettingsMutation({
                    userId: userData.id,
                    jsonSettings: {
                        ...currentJsonSettings,
                        ...newSettings,
                    },
                }),
            ).unwrap();

            if (!response) {
                throw new Error('Произошла ошибка уровни сервиса saveJsonSettings');
            }
            return response.jsonSettings;
        } catch (error) {
            return rejectWithValue(error as string);
        }
    },
);
