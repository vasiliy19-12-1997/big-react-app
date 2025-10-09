import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider/config/StateSchema';
import { getArticleDetailsData } from '@/entities/Article/model/selectors/getArticleDetails';
import { getAuthUserData } from '@/entities/User';
import { fetchCommentsByArticleId } from './fetchCommentsByArticleId';

interface addCommentForArticleProps{

}
enum LoginErrors{
    INCORRECT_DATA = '',
    SERVER_ERROD = ''
}
export const addCommentForArticle = createAsyncThunk<Comment, string, ThunkConfig<string>>(
    'ArticlePageDetails/addCommentForArticle',
    async (text, thunkApi) => {
        const {
            extra, dispatch, rejectWithValue, getState,
        } = thunkApi;
        const userData = getAuthUserData(getState());
        const article = getArticleDetailsData(getState());
        if (!text || !userData || !article) {
            return rejectWithValue('Ошибка при получение стейта text || userData || article');
        }
        try {
            const response = await extra.api.post<Comment>('/comments', {
                text,
                articleId: article.id,
                userId: userData.id,
            });

            if (!response.data) {
                throw new Error();
            }
            dispatch(fetchCommentsByArticleId(article.id));

            return response.data;
        } catch (error) {
            return rejectWithValue('error');
        }
    },
);
