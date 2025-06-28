import {
    profileActions, profileReducers, fetchProfileData, updateProfileData,
} from 'features/EditableProfileCard';
import { Profile, ProfileSchema } from './model/types/profile';
import { ProfileCard } from './ui/ProfileCard/ProfileCard';

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
