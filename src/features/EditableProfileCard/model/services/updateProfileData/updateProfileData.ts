import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider/config/StateSchema';
import { Profile } from 'entities/Profile';
import { ValidateProfileErrors } from 'entities/Profile/model/types/profile';
import { validateProfileData } from 'features/EditableProfileCard';
import { getProfileForm } from '../../selectors/getProfileForm/getProfileForm';

export const updateProfileData = createAsyncThunk<Profile, void, ThunkConfig<ValidateProfileErrors[]>>(
    'profile/updateProfileData',
    async (_, thunkApi) => {
        const { extra, rejectWithValue, getState } = thunkApi;
        const formData = getProfileForm(getState());
        const errors = validateProfileData(formData);
        if (errors.length) {
            return rejectWithValue([ValidateProfileErrors.NO_DATA]);
        }

        try {
            const response = await extra.api.put<Profile>(`/profile/${formData?.id}`, formData);
            if (!response) {
                throw new Error();
            }
            return response.data;
        } catch (error) {
            console.log(error);
            return rejectWithValue([ValidateProfileErrors.SERVER_ERROR]);
        }
    },
);
