import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/shared/config/state';
import { FeaturesType } from '@/shared/types/features';
import { updateFeatureFlagsMutation } from '../api/featureFlagsApi';
import { getAllFeatureFlags, setFeaturesFlags } from '../lib/getSetFeatures';

interface UpdateFeatureFlagOptions {
    userId: string;
    newFeatures: Partial<FeaturesType>;
}

export const updateFeatureFlag = createAsyncThunk<void, UpdateFeatureFlagOptions, ThunkConfig<string>>(
    'user/saveJsonSettings',
    async ({ userId, newFeatures }, thunkApi) => {
        const { rejectWithValue, dispatch } = thunkApi;
        const allFeatures = {
            ...getAllFeatureFlags(),
            ...newFeatures,
        };
        try {
            await dispatch(
                updateFeatureFlagsMutation({
                    userId,
                    features: allFeatures,
                }),
            );
            setFeaturesFlags(allFeatures);
            window.location.reload();
            return undefined;
        } catch (e) {
            console.log(e);
            return rejectWithValue('');
        }
    },
);
