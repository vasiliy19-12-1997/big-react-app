import { createSelector } from '@reduxjs/toolkit';
import { StateSchema } from '@/app/providers/StoreProvider';
import { UserRoles } from '../../types/UserSchema';

export const getRoleSelector = (state: StateSchema) => state.user.authData?.roles;

export const isUserAdmin = createSelector(getRoleSelector, (roles) => {
    return Boolean(roles?.includes(UserRoles.ADMIN));
});
export const isUserManager = createSelector(getRoleSelector, (roles) => {
    return Boolean(roles?.includes(UserRoles.MANAGER));
});
