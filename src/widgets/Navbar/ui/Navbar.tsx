import { LoginModal } from 'features/AuthByUsername';
import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { useDispatch, useSelector } from 'react-redux';

import { getAuthUserData, userActions } from 'entities/User';
import cls from './Navbar.module.scss';

interface NavbarProps {
    className?: string;
}

export const Navbar = ({ className }: NavbarProps) => {
    const { t } = useTranslation();
    const [isAuthModal, setIsAuthModal] = useState(false);
    const authUser = useSelector(getAuthUserData);
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
            <div className={classNames(cls.Navbar, {}, [className])}>
                <div className={cls.links}>
                    <Button theme={ButtonTheme.CLEAR_INVERTED} onClick={onLogout}>
                        {t('Выйти')}
                    </Button>
                </div>
            </div>
        );
    }
    return (
        <div className={classNames(cls.Navbar, {}, [className])}>
            <div className={cls.links}>
                <Button theme={ButtonTheme.CLEAR_INVERTED} onClick={onShowModal}>
                    {t('Войти')}
                </Button>
                <LoginModal
                    isOpen={isAuthModal}
                    onClose={onCloseModal}
                />

            </div>
        </div>
    );
};
