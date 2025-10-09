import { RoutePath } from '@/shared/config/routeConfig/routeConfig';
import { Avatar } from '@/shared/ui/Avatar/Avatar';
import { DropDown } from '@/shared/ui/Popups';
import {
    getAuthUserData, isUserAdmin, isUserManager, userActions,
} from '@/entities/User';
import { useDispatch, useSelector } from 'react-redux';
import { useCallback } from 'react';
import cls from './AvatarDropDown.module.scss';

export const AvatarDropDown = () => {
    const authUser = useSelector(getAuthUserData);
    const isAdmin = useSelector(isUserAdmin);
    const dispatch = useDispatch();
    const isManager = useSelector(isUserManager);
    const isAdminPanelAvailable = isAdmin || isManager;
    const onLogout = useCallback(() => {
        dispatch(userActions.logout());
    }, [dispatch]);
    if (!authUser) {
        return null;
    }
    return (
        <DropDown
            className={cls.dropDown}
            items={[
                ...(isAdminPanelAvailable ? [
                    { content: 'Админка', href: RoutePath.admin }] : []),
                { content: 'Выйти', onClick: onLogout },
                { content: 'Профиль', href: RoutePath.profile + authUser.id },
            ]}
            direction="bottom left"
            trigger={<Avatar size={30} src={authUser?.avatar} alt="Аватар" />}
        />
    );
};
