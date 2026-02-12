import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { getAuthUserData } from '@/entities/User';
import { LoginModal } from '@/features/AuthByUsername';
import { AvatarDropDown } from '@/features/AvatarDropDown';
import { NotificationButton } from '@/features/NotificationButton';
import { getRouteArticleCreate } from '@/shared/const/router';
import { classNames } from '@/shared/lib/classNames/classNames';
import { AppLink, AppLinkTheme } from '@/shared/ui/deprecated/AppLink';
import { Button as ButtonDeprecated, ButtonTheme } from '@/shared/ui/deprecated/Button';
import { Text, TextTheme } from '@/shared/ui/deprecated/Text';
import cls from './Navbar.module.scss';
import { toggleFeatures, ToggleFeatures } from '@/shared/features';
import { HStack } from '@/shared/ui/redesigned/Stack';
import { Button } from '@/shared/ui/redesigned/Button';

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

    const mainClass = toggleFeatures({
        name: 'isNewDesignEnabled',
        on: () => cls.NavbarRedesign,
        off: () => cls.Navbar,
    });

    if (authUser) {
        return (
            <ToggleFeatures
                name="isNewDesignEnabled"
                on={
                    <header className={classNames(cls.NavbarRedesigned, {}, [className])}>
                        <HStack gap={16} className={cls.actions}>
                            <NotificationButton />
                            <AvatarDropDown />
                        </HStack>
                    </header>
                }
                off={
                    <header className={classNames(cls.Navbar, {}, [className])}>
                        <Text title={t('Vasiliy App')} className={cls.appName} theme={TextTheme.INVERTED} />
                        <AppLink theme={AppLinkTheme.SECONDARY} className={cls.createLink} to={getRouteArticleCreate()}>
                            {t('Create Articles')}
                        </AppLink>
                        <HStack gap={16} className={cls.actions}>
                            <NotificationButton />
                            <AvatarDropDown />
                        </HStack>
                    </header>
                }
            />
        );
    }
    return (
        <header className={classNames(mainClass, {}, [className])}>
            <ToggleFeatures
                name="isNewDesignEnabled"
                on={
                    <Button className={cls.links} variant="clear" onClick={onShowModal}>
                        {t('Войти')}
                    </Button>
                }
                off={
                    <ButtonDeprecated className={cls.links} theme={ButtonTheme.CLEAR_INVERTED} onClick={onShowModal}>
                        {t('Войти')}
                    </ButtonDeprecated>
                }
            />
            {isAuthModal && <LoginModal isOpen={isAuthModal} onClose={onCloseModal} />}
        </header>
    );
};
