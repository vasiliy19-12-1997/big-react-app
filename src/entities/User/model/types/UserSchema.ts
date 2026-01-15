import { FeaturesType } from '@/shared/types/features';

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
}
export interface UserSchema {
    authData?: User;
    _mounted?: boolean;
}
