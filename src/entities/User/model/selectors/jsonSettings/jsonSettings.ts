import { buildSelector } from '@/shared/lib/store';
import { JsonSettingsProperties } from '../../types/jsonSettings';

const defaultSettings: JsonSettingsProperties = {};
export const [useJsonSettings, getJsonSettings] = buildSelector(
    (state) => state.user.authData?.jsonSettings ?? defaultSettings,
);
