import { rtqApi } from '@/shared/config/api/rtqApi';
import { User } from '../types/UserSchema';
import { JsonSettingsProperties } from '../types/jsonSettings';

export interface setJsonSettingsProps {
    userId: string;
    jsonSettings: JsonSettingsProperties;
}

const setJsonSettingsApi = rtqApi.injectEndpoints({
    endpoints: (build) => ({
        updateJsonSettings: build.mutation<User, setJsonSettingsProps>({
            query: ({ userId, jsonSettings }) => ({
                url: `/users/${userId}`,
                params: {
                    userId,
                },
                method: 'PATCH',
                body: { jsonSettings },
            }),
        }),
    }),
});
export const setJsonSettingsMutation = setJsonSettingsApi.endpoints.updateJsonSettings.initiate;
