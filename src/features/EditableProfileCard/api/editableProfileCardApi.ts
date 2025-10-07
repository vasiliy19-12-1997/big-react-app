import { Profile } from 'entities/Profile';
import { rtqApi } from 'shared/config/api/rtqApi';

const editableProfileCardApi = rtqApi.injectEndpoints({
    endpoints: (build) => ({
        getProfileData: build.query<Profile, string | undefined >({
            query: (profileId) => ({
                url: `/profile/${profileId}`,
            }),
        }),
        updateProfileData: build.mutation<Profile, Partial<Profile> & { id: string }>({
            query: ({ id, ...patch }) => ({
                url: `/profile/${id}`,
                method: 'PATCH',
                body: patch,
            }),
            // // Инвалидируем кэш после успешного обновления
            // invalidatesTags: (_result, _error, arg) => [
            //     { type: 'Profile', id: arg.id },
            // ],
            // Оптимистичное обновление
            async onQueryStarted({ id, ...patch }, { dispatch, queryFulfilled }) {
                const patchResult = dispatch(
                    editableProfileCardApi.util.updateQueryData(
                        'getProfileData',
                        id,
                        (draft) => {
                            Object.assign(draft, patch);
                        },
                    ),
                );
                try {
                    await queryFulfilled;
                } catch {
                    patchResult.undo();
                }
            },
        }),
    }),
    overrideExisting: false,
});
export const useFetchProfileData = editableProfileCardApi.useGetProfileDataQuery;
export const useUpdateProfileData = editableProfileCardApi.useUpdateProfileDataMutation;
