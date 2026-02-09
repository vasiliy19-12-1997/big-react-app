import { rtqApi } from '@/shared/config/api/rtqApi';
import { FeaturesType } from '@/shared/types/features';

export interface updateFeatureOptions {
    userId: string;
    features: FeaturesType;
}

const featureFlagsApi = rtqApi.injectEndpoints({
    endpoints: (build) => ({
        updateFeatureFlags: build.mutation<void, updateFeatureOptions>({
            query: ({ userId, features }) => ({
                url: `/users/${userId}`,
                params: {
                    userId,
                },
                method: 'PATCH',
                body: { features },
            }),
        }),
    }),
});
export const updateFeatureFlagsMutation = featureFlagsApi.endpoints.updateFeatureFlags.initiate;
