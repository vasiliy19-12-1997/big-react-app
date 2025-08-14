import { StateSchema } from 'app/providers/StoreProvider';

export const getArticlesError = (state:StateSchema) => state.articlePage?.error || undefined;
export const getArticlesIsLoading = (state:StateSchema) => state.articlePage?.isLoading || false;
export const getArticlesViews = (state:StateSchema) => state.articlePage?.view || undefined;
