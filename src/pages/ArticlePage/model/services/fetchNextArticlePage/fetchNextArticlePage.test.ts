import { TestAsyncThunk } from 'shared/lib/tests/TestAsyncThunk/TestAsyncThunk';
import { fetchNextArticlePage } from './fetchNextArticlePage';
import { fetchArticles } from '../fetchArticles/fetchArticles';

jest.mock('../fetchArticles/fetchArticles');
describe('fetchNextArticlePage.test', () => {
    test('success fetch data', async () => {
        const thunk = new TestAsyncThunk(fetchNextArticlePage, {
            articlePage: {
                entities: {},
                page: 3,
                limit: 6,
                isLoading: false,
                hasMore: true,
            },
        });
        const result = await thunk.callThunk();

        expect(thunk.dispatch).toBeCalledTimes(4);
        expect(fetchArticles).toHaveBeenCalled();
    });
    test('unsuccess fetch data', async () => {
        const thunk = new TestAsyncThunk(fetchNextArticlePage, {
            articlePage: {
                entities: {},
                page: 3,
                limit: 6,
                isLoading: false,
                hasMore: false,
            },
        });
        const result = await thunk.callThunk();

        expect(thunk.dispatch).toBeCalledTimes(2);
        expect(fetchArticles).not.toHaveBeenCalled();
    });
});
