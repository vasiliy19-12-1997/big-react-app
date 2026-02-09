import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { getAuthUserData, isUserAdmin, isUserManager, userActions } from '@/entities/User';
import { getRouteAdmin, getRouteProfile, getRouteSettings } from '@/shared/const/router';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Avatar as AvatarDeprecated } from '@/shared/ui/deprecated/Avatar';
import { DropDown as DropDownDeprecated } from '@/shared/ui/deprecated/Popups';
import cls from './AvatarDropDown.module.scss';
import { ToggleFeatures } from '@/shared/features';
import { DropDown } from '@/shared/ui/redesigned/Popups';
import { Avatar } from '@/shared/ui/redesigned/Avatar';

export const AvatarDropDown = () => {
    const authUser = useSelector(getAuthUserData);
    const isAdmin = useSelector(isUserAdmin);
    const dispatch = useAppDispatch();
    const isManager = useSelector(isUserManager);
    const isAdminPanelAvailable = isAdmin || isManager;

    const onLogout = useCallback(() => {
        dispatch(userActions.logout());
    }, [dispatch]);

    if (!authUser) {
        return null;
    }
    const items = [
        ...(isAdminPanelAvailable ? [{ content: 'Админка', href: getRouteAdmin() }] : []),
        { content: 'Выйти', onClick: onLogout },
        { content: 'Настройки', href: getRouteSettings() },
        { content: 'Профиль', href: getRouteProfile(authUser.id) },
    ];
    return (
        <ToggleFeatures
            name="isNewDesignEnabled"
            on={
                <DropDown
                    className={cls.dropDown}
                    items={items}
                    direction="bottom left"
                    trigger={<Avatar size={40} src={authUser?.avatar} alt="Аватар" />}
                />
            }
            off={
                <DropDownDeprecated
                    className={cls.dropDown}
                    items={items}
                    direction="bottom left"
                    trigger={<AvatarDeprecated fallbackInverted size={30} src={authUser?.avatar} alt="Аватар" />}
                />
            }
        />
    );
};
