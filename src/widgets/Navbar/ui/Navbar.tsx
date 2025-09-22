import {
    getAuthUserData, isUserAdmin, isUserManager, userActions,
} from 'entities/User';
import { LoginModal } from 'features/AuthByUsername';
import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { classNames } from 'shared/lib/classNames/classNames';
import { AppLink, AppLinkTheme } from 'shared/ui/AppLink/AppLink';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { Text, TextTheme } from 'shared/ui/Text/Text';
import { Page } from 'widgets/Page/Page';
import { DropDown } from 'shared/ui/DropDown/DropDown';
import { Avatar } from 'shared/ui/Avatar/Avatar';
import cls from './Navbar.module.scss';

interface NavbarProps {
    className?: string;
}

export const Navbar = ({ className }: NavbarProps) => {
    const { t } = useTranslation();
    const [isAuthModal, setIsAuthModal] = useState(false);
    const authUser = useSelector(getAuthUserData);
    const isAdmin = useSelector(isUserAdmin);
    const isManager = useSelector(isUserManager);
    const isAdminPanelAvailable = isAdmin || isManager;
    const dispatch = useDispatch();

    const onShowModal = useCallback(() => {
        setIsAuthModal(true);
    }, []);
    const onCloseModal = useCallback(() => {
        setIsAuthModal(false);
    }, []);
    const onLogout = useCallback(() => {
        dispatch(userActions.logout());
    }, [dispatch]);

    if (authUser) {
        return (
            <header className={classNames(cls.Navbar, {}, [className])}>
                <Text title={t('Vasiliy App')} className={cls.appName} theme={TextTheme.INVERTED} />
                <AppLink theme={AppLinkTheme.SECONDARY} className={cls.createLink} to={RoutePath.article_create}>{t('Create Articles')}</AppLink>
                <div className={cls.links}>
                    <DropDown
                        className={cls.dropDown}
                        items={[
                            ...(isAdminPanelAvailable ? [
                                { content: 'Админка', href: RoutePath.admin }] : []),
                            { content: 'Выйти', onClick: onLogout },
                            { content: 'Профиль', href: RoutePath.profile + authUser.id },
                        ]}
                        direction="bottom left"
                        trigger={<Avatar size={30} src={authUser?.avatar} />}
                    />

                </div>
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
