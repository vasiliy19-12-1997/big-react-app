import { StateSchema } from '@/app/providers/StoreProvider';
import { ArticleType } from '@/entities/Article';
import { buildSelector } from '@/shared/lib/store';

export const getArticlesError = (state: StateSchema) => state.articlePage?.error || undefined;
export const getArticlesIsLoading = (state: StateSchema) => state.articlePage?.isLoading || false;
export const getArticlesViews = (state: StateSchema) => state.articlePage?.view || undefined;
export const getArticlesPageNumber = (state: StateSchema) => state.articlePage?.page || 1;
export const getArticlesPageLimit = (state: StateSchema) => state.articlePage?.limit || 9;
export const getArticlesPageHasMore = (state: StateSchema) => state.articlePage?.hasMore || false;
export const getArticlesPageInited = (state: StateSchema) => state.articlePage?._inited || false;
export const getArticlesPageType = (state: StateSchema) => state.articlePage?.type || ArticleType.ALL;

export const [useArticleitemById] = buildSelector((state: StateSchema, id: string) => state.articlePage?.entities[id]);
