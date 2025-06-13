import { DeepPartial } from '@reduxjs/toolkit';
import { StateSchema } from 'app/providers/StoreProvider';
import { getLoginUsername } from './getLoginUsername';

describe('getLoginUsername.test', () => {
    test('should return username', () => {
        const state:DeepPartial<StateSchema> = {
            login: {
                username: 'vasya',
            },
        };
        expect(getLoginUsername(state as StateSchema)).toEqual('vasya');
    });
    describe('getLoginUsername.test', () => {
        test('should return empty string', () => {
            const state:DeepPartial<StateSchema> = {};
            expect(getLoginUsername(state as StateSchema)).toEqual('');
        });
    });
});
