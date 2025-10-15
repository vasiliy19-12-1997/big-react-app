import { Rating } from '@/entities/Rating';
import { rtqApi } from '@/shared/config/api/rtqApi';

const getRatingApi = rtqApi.injectEndpoints({
    endpoints: (build) => ({
        getRatings: build.query<Rating[], {articleId:string, userId?:string}>({
            query: ({ articleId, userId }) => ({
                url: '/article-ratings',
                params: {
                    articleId,
                    userId,
                },
            }),
        }),
    }),
});
export const useGetRatings = getRatingApi.useGetRatingsQuery;
