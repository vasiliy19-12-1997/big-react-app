import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { AppLink, AppLinkTheme } from 'shared/ui/AppLink/AppLink';
import { SidebarItemType } from 'widgets/Sidebar/model/items';
import { useSelector } from 'react-redux';
import { getAuthUserData } from 'entities/User';
import cls from './SidebarItem.module.scss';

interface SidebarItemProps {
    item:SidebarItemType
    collapsed:boolean
}

export const SidebarItem = memo((props: SidebarItemProps) => {
    const { t } = useTranslation();
    const isAuth = useSelector(getAuthUserData);
    const {
        item,
        collapsed,
    } = props;
    if (item.authOnly && !isAuth) {
        return null;
    }
    return (
        <AppLink
            theme={AppLinkTheme.SECONDARY}
            to={item.path}
            className={classNames(cls.item, { [cls.collapsed]: collapsed })}
        >
            <item.Icon className={cls.icon} />
            <span className={cls.link}>
                {t(`${item.text}`)}
            </span>
        </AppLink>
    );
});
