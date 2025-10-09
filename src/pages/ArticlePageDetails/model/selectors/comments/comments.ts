import { StateSchema } from '@/app/providers/StoreProvider';

export const getArticleDetailsCommentsError = (state:StateSchema) => state.articlePageDetails?.comments?.error || undefined;
export const getArticleDetailsCommentsIsLoading = (state:StateSchema) => state.articlePageDetails?.comments?.isLoading || false;
