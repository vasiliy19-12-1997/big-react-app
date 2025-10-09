import { StateSchema } from '@/app/providers/StoreProvider';

export const getArticleDetailsData = (state:StateSchema) => state.articles?.data;
export const getArticleDetailsError = (state:StateSchema) => state.articles?.error || undefined;
export const getArticleDetailsIsLoading = (state:StateSchema) => state.articles?.isLoading || false;
