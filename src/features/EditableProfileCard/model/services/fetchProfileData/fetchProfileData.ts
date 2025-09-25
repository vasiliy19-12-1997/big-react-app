import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider/config/StateSchema';
import { Profile } from 'entities/Profile';

export const fetchProfileData = createAsyncThunk<Profile, string | undefined, ThunkConfig<string>>(
    'profile/fetchProfileData',
    async (profileId, thunkApi) => {
        const { extra, rejectWithValue } = thunkApi;
        try {
             if (!profileId) {
                throw new Error("Профиль не найден")
                }
 const response = await extra.api.get<Profile>(`/profile/${profileId}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error as string);
        }
    },
);
