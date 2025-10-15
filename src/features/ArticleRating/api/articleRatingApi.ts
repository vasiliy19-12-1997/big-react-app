import { Rating } from '@/entities/Rating';
import { rtqApi } from '@/shared/config/api/rtqApi';

export interface GetRatingsProps{
    articleId:string,
    userId?:string
}
export interface PostRatingsProps{
    articleId:string,
    userId?:string,
    feedback:string,
    rate:number
}
const getRatingApi = rtqApi.injectEndpoints({
    endpoints: (build) => ({
        getRatings: build.query<Rating[], GetRatingsProps>({
            query: ({ articleId, userId }) => ({
                url: '/article-ratings',
                params: {
                    articleId,
                    userId,
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
