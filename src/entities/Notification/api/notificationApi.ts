import { rtqApi } from 'shared/config/api/rtqApi';
import { Notification } from '../model/notification';

const notificationApi = rtqApi.injectEndpoints({
    endpoints: (build) => ({
        getNotificationList: build.query<Notification[], null>({
            query: () => ({
                url: '/notifications',
            }),
        }),
    }),
});
export const useNotificationList = notificationApi.useGetNotificationListQuery;
