import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { isMobile } from 'react-device-detect';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Sceleton as SceletonDeprecated } from '@/shared/ui/deprecated/Sceleton';
import { Sceleton as SceletonRedesign } from '@/shared/ui/redesigned/Sceleton';
import { useNotificationList } from '../../api/notificationApi';
import { NotificationItem } from '../NotificationItem/NotificationItem';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { toggleFeatures } from '@/shared/features';

interface NotificationListProps {
    className?: string;
}

export const NotificationList = memo((props: NotificationListProps) => {
    const { t } = useTranslation();
    const { className } = props;
    const { data, isLoading } = useNotificationList(null, { pollingInterval: 5000 });

    const Sceleton = toggleFeatures({
        name: 'isNewDesignEnabled',
        on: () => {
            return SceletonRedesign;
        },
        off: () => {
            return SceletonDeprecated;
        },
    });
    const Mobile = (
        <VStack gap={16} max className={classNames('', {}, [className])}>
            <Sceleton height={120} border="8%" />
            <Sceleton height={120} border="8%" />
            <Sceleton height={120} border="8%" />
        </VStack>
    );
    if (isLoading) {
        if (isMobile) {
            return Mobile;
        }
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
