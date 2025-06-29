import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider/config/StateSchema';

import { Profile } from 'entities/Profile';
import { validateProfileError } from 'features/EditableProfileCard';
import { ValidateProfileErrors } from 'entities/Profile/model/types/profile';
import { getProfileForm } from '../../selectors/getProfileForm/getProfileForm';

export const updateProfileData = createAsyncThunk<Profile, void, ThunkConfig<ValidateProfileErrors[]>>(
    'profile/updateProfileData',
    async (_, thunkApi) => {
        const { extra, rejectWithValue, getState } = thunkApi;
        const formData = getProfileForm(getState());
        const errors = validateProfileError(formData);
        if (errors.length) {
            return rejectWithValue([ValidateProfileErrors.NO_DATA]);
        }

        try {
            const response = await extra.api.put<Profile>('/profile', formData);
            return response.data;
        } catch (error) {
            console.log(error);
            return rejectWithValue([ValidateProfileErrors.SERVER_ERROR]);
        }
    },
);
