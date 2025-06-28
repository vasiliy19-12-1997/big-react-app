import { getProfileData } from './model/selectors/getProfileData/getProfileData';
import { getProfileError } from './model/selectors/getProfileError/getProfileError';
import { getProfileForm } from './model/selectors/getProfileForm/getProfileForm';
import { getProfileIsLoading } from './model/selectors/getProfileIsLoading/getProfileIsLoading';
import { getProfileReadonly } from './model/selectors/getProfileReadonly/getProfileReadonly';

export {
    getProfileData, getProfileError, getProfileForm, getProfileIsLoading, getProfileReadonly,
};

export {
    profileActions,
    profileReducers,
} from './model/slice/profileSlice';
export {
    fetchProfileData,

} from './model/services/fetchProfileData/fetchProfileData';
export {
    updateProfileData,

} from './model/services/updateProfileData/updateProfileData';
