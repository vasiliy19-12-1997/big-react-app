import { Profile } from 'entities/Profile';
import { ValidateProfileErrors } from 'entities/Profile/model/types/profile';

export const validateProfileError = (profile?:Profile) => {
    if (!profile) {
        return [ValidateProfileErrors.NO_DATA];
    }
    const {
        first, lastname, age, country,
    } = profile;

    const errors:ValidateProfileErrors[] = [];

    if (!first || !lastname) {
        errors.push(ValidateProfileErrors.INCORRECT_USER_DATA);
    }
    if (!age && !Number.isInteger(age)) {
        errors.push(ValidateProfileErrors.INCORRECT_AGE);
    }
    if (!country) {
        errors.push(ValidateProfileErrors.INCORRECT_COUNTRY);
    }
    return errors;
};
