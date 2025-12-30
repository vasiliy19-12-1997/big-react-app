import { Rating } from '@/entities/Rating';
import { rtqApi } from '@/shared/config/api/rtqApi';

export interface GetRatingsProps {
    articleId: string;
    userId?: string;
}
export interface PostRatingsProps {
    userId?: string;
    articleId: string;
    feedback: string;
    rate: number;
}
const getRatingApi = rtqApi.injectEndpoints({
    endpoints: (build) => ({
        getRatings: build.query<Rating[], GetRatingsProps>({
            query: ({ userId, articleId }) => ({
                url: '/article-ratings',
                params: {
                    userId,
                    articleId,
                },
            }),
        }),
        postRatings: build.mutation<void, PostRatingsProps>({
            query: (arg) => ({
                url: '/article-ratings',
                method: 'POST',
                body: arg,
            }),
        }),
    }),
});
export const useGetRatings = getRatingApi.useGetRatingsQuery;
export const usePostRatings = getRatingApi.usePostRatingsMutation;
