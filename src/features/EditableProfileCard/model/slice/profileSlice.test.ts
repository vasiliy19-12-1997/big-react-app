import { Country } from 'entities/Country';
import { Currency } from 'entities/Currency';
import { ProfileSchema, ValidateProfileErrors } from 'entities/Profile';
import { profileActions, profileReducers, updateProfileData } from 'features/EditableProfileCard';

describe('profileSlice.test', () => {
    const data = {
        first: 'vasya',
        lastname: 'konovalov',
        username: 'vasyan',
        city: 'ekaterunburg',
        country: Country.Russia,
        currency: Currency.USD,
        age: 25,
    };
    test('test setReadonly ', () => {
        const state:DeepPartial<ProfileSchema> = {
            readonly: false,
        };
        expect(profileReducers(state as ProfileSchema, profileActions.setReadonly(true))).toEqual({ readonly: true });
    });
    test('test updateProfile ', () => {
        const state:DeepPartial<ProfileSchema> = {
            form: {
                username: '12',
            },
        };
        expect(profileReducers(state as ProfileSchema, profileActions.updateProfile({ username: '123' }))).toEqual({ form: { username: '123' } });
    });
    test('test cancellEdit ', () => {
        const state:DeepPartial<ProfileSchema> = {
            data, form: { username: '' },
        };
        expect(profileReducers(state as ProfileSchema, profileActions.cancellEdit())).toEqual({
            readonly: true, validateErrors: undefined, data, form: data,
        });
    });
    test('test updateProfile pending', () => {
        const state:DeepPartial<ProfileSchema> = {
            isLoading: false,
            validateErrors: [ValidateProfileErrors.SERVER_ERROR],
        };

        expect(profileReducers(state as ProfileSchema, updateProfileData.pending))
            .toEqual({
                isLoading: true, validateErrors: undefined,
            });
    });
    test('test updateProfile fulfilled ', () => {
        const state:DeepPartial<ProfileSchema> = {
            isLoading: true,
            validateErrors:
                [
                    ValidateProfileErrors.SERVER_ERROR,
                    ValidateProfileErrors.NO_DATA,
                    ValidateProfileErrors.INCORRECT_COUNTRY,
                ],
        };

        expect(profileReducers(state as ProfileSchema, updateProfileData.fulfilled(data, '')))
            .toEqual({
                isLoading: false, validateErrors: undefined, readonly: true, data, form: data,
            });
    });
});
