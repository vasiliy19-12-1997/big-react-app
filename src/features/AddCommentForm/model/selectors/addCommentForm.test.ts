import { StateSchema } from '@/app/providers/StoreProvider';
import { getAddCommentFormError, getAddCommentFormText } from './addCommentForm';

describe('addCommentForm.test', () => {
    test('Should return text', () => {
        const state: DeepPartial<StateSchema> = {
            addCommentForm: {
                text: 'Hello',
                error: undefined,
            },
        };

        expect(getAddCommentFormText(state as StateSchema)).toEqual('Hello');
    });
    test('Should empty string', () => {
        const state: DeepPartial<StateSchema> = {
            addCommentForm: {
                text: '',
                error: undefined,
            },
        };

        expect(getAddCommentFormText(state as StateSchema)).toEqual('');
    });
    test('Should empty string another', () => {
        const state: DeepPartial<StateSchema> = {};
        expect(getAddCommentFormText(state as StateSchema)).toEqual('');
    });
    test('Should return error', () => {
        const state: DeepPartial<StateSchema> = {
            addCommentForm: {
                error: 'Test error',
                text: '',
            },
        };
        expect(getAddCommentFormError(state as StateSchema)).toEqual('Test error');
    });
    test('Should return undefined', () => {
        const state: DeepPartial<StateSchema> = {};
        expect(getAddCommentFormError(state as StateSchema)).toEqual(undefined);
    });
});
