import { Rating } from '@/entities/Rating';
import { rtqApi } from '@/shared/config/api/rtqApi';

export interface GetRatingsProfileProps{
    profileId:string,
    userId?:string
}
export interface PostRatingsProfileProps{
    userId?:string,
    profileId:string,
    feedback:string,
    rate:number
}
const getRatingProfileApi = rtqApi.injectEndpoints({
    endpoints: (build) => ({
        getRatingsProfile: build.query<Rating[], GetRatingsProfileProps>({
            query: ({ userId, profileId }) => ({
                url: '/profile-ratings',
                params: {
                    userId,
                    profileId,
                },
            }),
        }),
        postRatingsProfile: build.mutation<void, PostRatingsProfileProps>({
            query: (arg) => ({
                url: '/profile-ratings',
                method: 'POST',
                body: arg,
            }),
        }),
    }),
});
export const useGetRatingsProfile = getRatingProfileApi.useGetRatingsProfileQuery;
export const usePostRatingsProfile = getRatingProfileApi.usePostRatingsProfileMutation;
