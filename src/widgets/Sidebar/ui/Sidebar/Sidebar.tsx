import { memo, useState } from 'react';
import { useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Button, ButtonSize, ButtonTheme } from '@/shared/ui/Button';
import { ThemeSwitcher } from '@/features/ThemeSwitcher';
import { VStack } from '@/shared/ui/Stack';
import { getSidebarItems } from '../../model/selectors/getSidebarItems';
import { SidebarItem } from '../SidebarItem/SidebarItem';
import cls from './Sidebar.module.scss';
import { LangSwitcher } from '@/features/LangSwitcher';
import { ToggleFeatures } from '@/shared/features';
import { AppLogo } from '@/shared/ui/AppLogo';

interface SidebarProps {
    className?: string;
}

export const Sidebar = memo(({ className }: SidebarProps) => {
    const [collapsed, setCollapsed] = useState(false);
    const SidebarItemsList = useSelector(getSidebarItems);
    const onToggle = () => {
        setCollapsed((prev) => !prev);
    };

    return (
        <ToggleFeatures
            name={'isNewDesignEnabled'}
            on={
                <aside
                    data-testid="sidebar"
                    className={classNames(cls.SidebarRedesign, { [cls.collapsed]: collapsed }, [className])}
                    // eslint-disable-next-line i18next/no-literal-string
                >
                    <AppLogo className={cls.appLogo} />
                </aside>
            }
            off={
                <aside
                    data-testid="sidebar"
                    className={classNames(cls.Sidebar, { [cls.collapsed]: collapsed }, [className])}
                >
                    <Button
                        data-testid="sidebar-toggle"
                        onClick={onToggle}
                        className={cls.collapsedBtn}
                        theme={ButtonTheme.BACKGROUND_INVERTED}
                        square
                        size={ButtonSize.L}
                    >
                        {collapsed ? '>' : '<'}
                    </Button>
                    <VStack role="navigation" gap={8} className={cls.items}>
                        {SidebarItemsList.map((item) => (
                            <SidebarItem key={item.path} item={item} collapsed={collapsed} />
                        ))}
                    </VStack>
                    <div className={cls.switchers}>
                        <ThemeSwitcher />
                        <LangSwitcher className={cls.lang} short={collapsed} />
                    </div>
                </aside>
            }
        />
    );
});
