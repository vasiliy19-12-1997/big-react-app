import { userReducer, userActions } from './model/slice/UserSlice';
import { User, UserRoles, UserSchema } from './model/types/UserSchema';
import { getAuthUserData } from './model/selectors/getAuthUserData';
import { getAuthUserMounted } from './model/selectors/getAuthUserMounted';

export {
    User, userActions, userReducer, UserSchema, getAuthUserData, getAuthUserMounted,
};
export {
    getRoleSelector,
    isUserAdmin,
    isUserManager,
} from './model/selectors/roleSelector/roleSelector';
export { UserRoles };
