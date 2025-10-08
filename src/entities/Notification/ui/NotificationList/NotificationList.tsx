import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { HStack, VStack } from 'shared/ui/Stack';
import { Sceleton } from 'shared/ui/Sceleton/Sceleton';
import { useNotificationList } from '../../api/notificationApi';
import { NotificationItem } from '../NotificationItem/NotificationItem';

interface NotificationListProps {
  className?: string;
}

export const NotificationList = memo((props: NotificationListProps) => {
    const { t } = useTranslation();
    const { className } = props;
    const { data, isLoading } = useNotificationList(null, { pollingInterval: 5000 });
    console.log(data);
    if (isLoading) {
        return (
            <VStack gap={16} max className={classNames('', {}, [className])}>
                <Sceleton width={400} height={80} border="8%" />
                <Sceleton width={400} height={80} border="8%" />
                <Sceleton width={400} height={80} border="8%" />
            </VStack>
        );
    }
    return (
        <VStack gap={16} max className={classNames('', {}, [className])}>
            {data?.map((item, index) => (
                <NotificationItem item={item} key={item.id} />
            ))}
        </VStack>
    );
});
