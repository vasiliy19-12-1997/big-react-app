import { StateSchema } from '@/app/providers/StoreProvider';

export const getArticleDetailsData = (state:StateSchema) => state.articlesDetails?.data;
export const getArticleDetailsError = (state:StateSchema) => state.articlesDetails?.error || undefined;
export const getArticleDetailsIsLoading = (state:StateSchema) => state.articlesDetails?.isLoading || false;
