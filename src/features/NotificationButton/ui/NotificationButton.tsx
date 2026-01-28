import { useState, useCallback } from 'react';
import { BrowserView, MobileView } from 'react-device-detect';
import { NotificationList } from '@/entities/Notification';
import { Button, ButtonTheme } from '@/shared/ui/deprecated/Button';
import { Icon } from '@/shared/ui/deprecated/Icon';
import { PopOver } from '@/shared/ui/deprecated/Popups';
import NotificationIcon from '@/shared/assets/icons/notification-20-20.svg';
import { Drawer } from '@/shared/ui/deprecated/Drawer';
import cls from './NotificationButton.module.scss';

export const NotificationButton = () => {
    const [isOpen, setIsOpen] = useState(false);

    const onOpenDrawer = useCallback(() => {
        setIsOpen(true);
    }, []);
    const onCloseDrawer = useCallback(() => {
        setIsOpen(false);
    }, []);
    const trigger = (
        <Button onClick={onOpenDrawer} theme={ButtonTheme.CLEAR} className={cls.notification}>
            <Icon Svg={NotificationIcon} inverted />
        </Button>
    );
    return (
        <div>
            <BrowserView>
                <PopOver className={cls.one} direction="bottom left" trigger={trigger}>
                    <NotificationList className={cls.notifications} />
                </PopOver>
            </BrowserView>
            <MobileView>
                {trigger}
                <Drawer isOpen={isOpen} onClose={onCloseDrawer}>
                    <NotificationList />
                </Drawer>
            </MobileView>
        </div>
    );
};
