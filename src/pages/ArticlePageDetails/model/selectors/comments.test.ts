import { StateSchema } from 'app/providers/StoreProvider';
import { getArticleDetailsCommentsError, getArticleDetailsCommentsIsLoading } from './comments';

describe('comments.test', () => {
    test('should return error', () => {
        const state:DeepPartial<StateSchema> = {
            articleDetailsComments: {
                error: 'test error',
            },
        };
        expect(getArticleDetailsCommentsError(state as StateSchema)).toEqual('test error');
    });
    test('should return undefined', () => {
        const state:DeepPartial<StateSchema> = {
            articleDetailsComments: {
                error: '',
            },
        };
        expect(getArticleDetailsCommentsError(state as StateSchema)).toEqual(undefined);
    });
    test('should return true', () => {
        const state:DeepPartial<StateSchema> = {
            articleDetailsComments: {
                isLoading: true,
            },
        };
        expect(getArticleDetailsCommentsIsLoading(state as StateSchema)).toEqual(true);
    });
    test('should return false', () => {
        const state:DeepPartial<StateSchema> = {
            articleDetailsComments: {
                isLoading: undefined,
            },
        };
        expect(getArticleDetailsCommentsIsLoading(state as StateSchema)).toEqual(false);
    });
});
