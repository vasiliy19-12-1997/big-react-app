import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Card as CardDepreacted, CardTheme } from '@/shared/ui/deprecated/Card';
import { Text as TextDeprecated } from '@/shared/ui/deprecated/Text';
import { Notification } from '../../model/notification';
import cls from './NotificationItem.module.scss';
import { ToggleFeatures } from '@/shared/features';
import { Card } from '@/shared/ui/redesigned/Card';
import { Text } from '@/shared/ui/redesigned/Text';

interface NotificationItemProps {
    className?: string;
    item: Notification;
}

export const NotificationItem = memo((props: NotificationItemProps) => {
    const { className, item } = props;

    const content = (
        <ToggleFeatures
            name="isNewDesignEnabled"
            on={
                <Card className={classNames(cls.NotificationItem, {}, [className])} variant="outlined">
                    <Text title={item.title} text={item.description} />
                </Card>
            }
            off={
                <CardDepreacted
                    className={classNames(cls.NotificationItem, {}, [className])}
                    theme={CardTheme.OUTLINED}
                >
                    <TextDeprecated title={item.title} text={item.description} />
                </CardDepreacted>
            }
        />
    );

    if (item.href) {
        <a href={item.href} target="_blank" className={cls.links} rel="noreferrer">
            {content}
        </a>;
    }
    return content;
});
