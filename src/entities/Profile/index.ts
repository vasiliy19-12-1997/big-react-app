import { profileActions, profileReducers } from './model/slice/profileSlice';
import { Profile, ProfileSchema } from './model/types/profile';
import { fetchProfileData } from './model/services/fetchProfileData/fetchProfileData';
import { ProfileCard } from './ui/ProfileCard/ProfileCard';
import { updateProfileData } from './model/services/updateProfileData/updateProfileData';

export {
    Profile,
    ProfileSchema,
};
export {
    profileActions,
    profileReducers,
};
export {
    fetchProfileData,
    updateProfileData,
};
export { ProfileCard };
