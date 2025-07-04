import { userReducer } from 'entities/User/model/slice/UserSlice';
import { userActions } from './model/slice/UserSlice';
import { User, UserSchema } from './model/types/UserSchema';
import { getAuthUserData } from './model/selectors/getAuthUserData';

export {
    User, userActions, userReducer, UserSchema, getAuthUserData,
};
