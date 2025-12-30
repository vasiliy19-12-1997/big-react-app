import { StateSchema } from '@/app/providers/StoreProvider';

export const getArticleDetailsRecommendError = (state: StateSchema) => {
    return state.articlePageDetails?.recommends?.error || undefined;
};

export const getArticleDetailsRecommendIsLoading = (state: StateSchema) => {
    return state.articlePageDetails?.recommends?.isLoading || false;
};
