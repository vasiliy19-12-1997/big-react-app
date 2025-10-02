import {
    getAuthUserData,
} from 'entities/User';
import { LoginModal } from 'features/AuthByUsername';
import { AvatarDropDown } from 'features/AvatarDropDown';
import { NotificationButton } from 'features/NotificationButton';
import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { classNames } from 'shared/lib/classNames/classNames';
import { AppLink, AppLinkTheme } from 'shared/ui/AppLink/AppLink';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { HStack } from 'shared/ui/Stack';
import { Text, TextTheme } from 'shared/ui/Text/Text';
import { Drawer } from 'shared/ui/Drawer/Drawer';
import { NotificationList } from 'entities/Notification';
import cls from './Navbar.module.scss';

interface NavbarProps {
    className?: string;
}

export const Navbar = ({ className }: NavbarProps) => {
    const { t } = useTranslation();
    const [isAuthModal, setIsAuthModal] = useState(false);

    const authUser = useSelector(getAuthUserData);
    const onShowModal = useCallback(() => {
        setIsAuthModal(true);
    }, []);
    const onCloseModal = useCallback(() => {
        setIsAuthModal(false);
    }, []);

    if (authUser) {
        return (
            <header className={classNames(cls.Navbar, {}, [className])}>
                <Text title={t('Vasiliy App')} className={cls.appName} theme={TextTheme.INVERTED} />
                <AppLink theme={AppLinkTheme.SECONDARY} className={cls.createLink} to={RoutePath.article_create}>
                    {t('Create Articles')}

                </AppLink>

                <HStack gap={16} className={cls.actions}>
                    <NotificationButton />
                    <AvatarDropDown />
                </HStack>

            </header>
        );
    }
    return (
        <header className={classNames(cls.Navbar, {}, [className])}>
            <Button className={cls.links} theme={ButtonTheme.CLEAR_INVERTED} onClick={onShowModal}>
                {t('Войти')}
            </Button>
            {isAuthModal && (
                <LoginModal
                    isOpen={isAuthModal}
                    onClose={onCloseModal}
                />
            )}

        </header>
    );
};
