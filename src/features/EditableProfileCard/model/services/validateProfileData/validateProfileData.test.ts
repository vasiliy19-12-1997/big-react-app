import { Country } from 'entities/Country';
import { Currency } from 'entities/Currency';
import { validateProfileData } from './validateProfileData';
import { ValidateProfileErrors } from 'entities/Profile/model/consts/profileConsts';

describe('validateProfileDatatest', () => {
    const data = {
        first: 'vasya',
        lastname: 'konovalov',
        username: 'vasyan',
        city: 'ekaterunburg',
        country: Country.Russia,
        currency: Currency.USD,
        age: 25,
    };
    test('success fetch data', async () => {
        const result = validateProfileData(data);

        expect(result).toEqual([]);
    });
    test('wihtout first and last names', async () => {
        const result = validateProfileData({ ...data, first: '', lastname: '' });
        expect(result).toEqual([ValidateProfileErrors.INCORRECT_USER_DATA]);
    });
    test('wihtout age', async () => {
        const result = validateProfileData({ ...data, age: undefined });
        expect(result).toEqual([ValidateProfileErrors.INCORRECT_AGE]);
    });
    test('wihtout country', async () => {
        const result = validateProfileData({ ...data, country: undefined });
        expect(result).toEqual([ValidateProfileErrors.INCORRECT_COUNTRY]);
    });
    test('incorect all', async () => {
        const result = validateProfileData({});
        expect(result).toEqual(
            [
                ValidateProfileErrors.INCORRECT_USER_DATA,
                ValidateProfileErrors.INCORRECT_AGE,
                ValidateProfileErrors.INCORRECT_COUNTRY,
            ],
        );
    });
});
