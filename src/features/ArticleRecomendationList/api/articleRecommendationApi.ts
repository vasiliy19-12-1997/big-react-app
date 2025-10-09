import { Article } from '@/entities/Article';
import { rtqApi } from '@/shared/config/api/rtqApi';

const recommendationApi = rtqApi.injectEndpoints({
    endpoints: (build) => ({
        getArticleRecommendationList: build.query<Article[], number>({
            query: (limit) => ({
                url: '/articles',
                params: {
                    _limit: limit,
                },
            }),
        }),
    }),
});
export const userArticleRecommendationList = recommendationApi.useGetArticleRecommendationListQuery;
