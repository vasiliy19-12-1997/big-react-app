import { StateSchema } from '@/app/providers/StoreProvider';
import { getArticleDetailsData, getArticleDetailsError, getArticleDetailsIsLoading } from './getArticleDetails';

describe('getArticleDetails.test', () => {
    const data = {
        id: '1',
        title: 'fdfdf',
    };
    test('should return data', () => {
        const state:DeepPartial<StateSchema> = {
            articles: {
                data,
            },
        };
        expect(getArticleDetailsData(state as StateSchema)).toEqual(data);
    });
    test('should return undefined data', () => {
        const state:DeepPartial<StateSchema> = {};
        expect(getArticleDetailsData(state as StateSchema)).toEqual(undefined);
    });
    test('should return loading', () => {
        const state:DeepPartial<StateSchema> = {
            articles: {
                isLoading: true,
            },
        };
        expect(getArticleDetailsIsLoading(state as StateSchema)).toEqual(true);
    });
    test('should return error', () => {
        const state:DeepPartial<StateSchema> = {
            articles: {
                error: 'fdf',
            },
        };
        expect(getArticleDetailsError(state as StateSchema)).toEqual(state.articles?.error);
    });
    test('should work with empty state error', () => {
        const state:DeepPartial<StateSchema> = {};
        expect(getArticleDetailsError(state as StateSchema)).toEqual(undefined);
    });
    test('should work with empty loading', () => {
        const state:DeepPartial<StateSchema> = {};
        expect(getArticleDetailsIsLoading(state as StateSchema)).toEqual(false);
    });
});
