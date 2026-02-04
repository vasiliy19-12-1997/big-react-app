import { useState, useCallback } from 'react';
import { BrowserView, MobileView } from 'react-device-detect';
import { NotificationList } from '@/entities/Notification';
import { Button as ButtonDeprecated, ButtonTheme } from '@/shared/ui/deprecated/Button';
import { Icon as IconDeprecated } from '@/shared/ui/deprecated/Icon';
import { PopOver as PopoverDeprecated } from '@/shared/ui/deprecated/Popups';
import { Drawer } from '@/shared/ui/deprecated/Drawer';
import cls from './NotificationButton.module.scss';
import { ToggleFeatures } from '@/shared/features';
import { Icon } from '@/shared/ui/redesigned/Icon';
import NotificationIconDeprecated from '@/shared/assets/icons/notification-20-20.svg';
import NotificationIcon from '@/shared/assets/icons/notification.svg';
import { PopOver } from '@/shared/ui/redesigned/Popups';

export const NotificationButton = () => {
    const [isOpen, setIsOpen] = useState(false);

    const onOpenDrawer = useCallback(() => {
        setIsOpen(true);
    }, []);
    const onCloseDrawer = useCallback(() => {
        setIsOpen(false);
    }, []);
    const trigger = (
        <ToggleFeatures
            name="isNewDesignEnabled"
            on={<Icon Svg={NotificationIcon} clickable onClick={onOpenDrawer} />}
            off={
                <ButtonDeprecated onClick={onOpenDrawer} theme={ButtonTheme.CLEAR} className={cls.notification}>
                    <IconDeprecated Svg={NotificationIconDeprecated} inverted />
                </ButtonDeprecated>
            }
        />
    );
    return (
        <div>
            <BrowserView>
                <ToggleFeatures
                    name="isNewDesignEnabled"
                    on={
                        <PopOver className={cls.one} direction="bottom left" trigger={trigger}>
                            <NotificationList className={cls.notifications} />
                        </PopOver>
                    }
                    off={
                        <PopoverDeprecated className={cls.one} direction="bottom left" trigger={trigger}>
                            <NotificationList className={cls.notifications} />
                        </PopoverDeprecated>
                    }
                />
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
