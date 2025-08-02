import { Country } from 'entities/Country';
import { Currency } from 'entities/Currency';
import { TestAsyncThunk } from 'shared/lib/tests/TestAsyncThunk/TestAsyncThunk';
import { fetchProfileData } from './fetchProfileData';

describe('fetchProfileData.test', () => {
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
        const thunk = new TestAsyncThunk(fetchProfileData);
        thunk.api.get.mockReturnValue(Promise.resolve({ data }));
        const result = await thunk.callThunk('1');

        expect(thunk.api.get).toHaveBeenCalled();
        expect(result.meta.requestStatus).toBe('fulfilled');
        expect(result.payload).toEqual(data);
    });
    test('error fetch', async () => {
        const thunk = new TestAsyncThunk(fetchProfileData);
        thunk.api.get.mockRejectedValue(new Error('403'));
        const result = await thunk.callThunk('1');

        expect(result.meta.requestStatus).toBe('rejected');
    });
});
