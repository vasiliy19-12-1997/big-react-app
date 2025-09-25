import { userReducer, userActions } from './model/slice/UserSlice';
import { User, UserRoles, UserSchema } from './model/types/UserSchema';
import { getAuthUserData } from './model/selectors/getAuthUserData';
import { getAuthUserMounted } from './model/selectors/getAuthUserMounted';

export  {
     userActions, userReducer, getAuthUserData, getAuthUserMounted,
};
export type {
    User, UserSchema
}
export {
    getRoleSelector,
    isUserAdmin,
    isUserManager,
} from './model/selectors/roleSelector/roleSelector';
export { UserRoles };
