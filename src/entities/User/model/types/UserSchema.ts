import { FeaturesType } from '@/shared/types/features';
import { JsonSettingsProperties } from '@/entities/User/model/types/jsonSettings';

export enum UserRoles {
    ADMIN = 'ADMIN',
    USER = 'USER',
    MANAGER = 'MANAGER',
}
export interface User {
    id: string;
    username: string;
    avatar?: string;
    roles?: UserRoles[];
    features?: FeaturesType;
    jsonSettings?: JsonSettingsProperties;
}
export interface UserSchema {
    authData?: User;
    _mounted?: boolean;
}
