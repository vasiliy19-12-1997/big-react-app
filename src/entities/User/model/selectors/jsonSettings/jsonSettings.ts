import { buildSelector } from '@/shared/lib/store';
import { JsonSettingsProperties } from '@/shared/types/json-settings';

export const [useJsonSettings, getJsonSettings] = buildSelector((state) => state.user.authData?.jsonSettings);

export const [useJsonSettingsByKey, getJsonSettingsByKey] = buildSelector(
    (state, key: keyof JsonSettingsProperties) => state.user.authData?.jsonSettings?.[key],
);
