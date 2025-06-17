import { StateSchema } from 'app/providers/StoreProvider';
import { getCounterValue } from './getCounterValue';

describe('getCounterValue.test', () => {
    const state: DeepPartial<StateSchema> = {
        counter: { value: 10 },
    };
    test('can return number', () => {
        expect(getCounterValue(state as StateSchema)).toEqual(10);
    });
});
