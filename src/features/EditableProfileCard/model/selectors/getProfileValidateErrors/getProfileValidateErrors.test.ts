import { StateSchema } from '@/app/providers/StoreProvider';
import { ValidateProfileErrors } from '@/entities/Profile/model/consts/profileConsts';
import { getProfileValidateErrors } from './getProfileValidateErrors';

describe('getProfileValidateErrors.test', () => {
    test('should return ', () => {
        const errors = [
            ValidateProfileErrors.INCORRECT_AGE,
            ValidateProfileErrors.SERVER_ERROR,
            ValidateProfileErrors.INCORRECT_COUNTRY,
            ValidateProfileErrors.INCORRECT_USER_DATA,
            ValidateProfileErrors.NO_DATA,
        ];
        const state:DeepPartial<StateSchema> = {
            profile: {
                validateErrors: errors,
            },
        };
        expect(getProfileValidateErrors(state as StateSchema)).toEqual(errors);
    });
    test('should return NO_DATA', () => {
        const state:DeepPartial<StateSchema> = {};
        expect(getProfileValidateErrors(state as StateSchema)).toEqual(undefined);
    });
});
