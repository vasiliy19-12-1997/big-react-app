import { StateSchema } from 'app/providers/StoreProvider';

export const getArticleDetailsCommentsError = (state:StateSchema) => state.articleDetailsComments?.error || undefined;
export const getArticleDetailsCommentsIsLoading = (state:StateSchema) => state.articleDetailsComments?.isLoading || false;
