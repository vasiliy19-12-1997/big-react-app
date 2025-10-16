import { memo, ReactNode, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Tabs.module.scss';
import { Card, CardTheme } from '../Card/Card';

export interface TabItem{
  value:string,
  content:ReactNode
}
export interface TabsProps {
  className?: string;
  tabs:TabItem[],
  value:string,
  onTabsClick:(tab:TabItem)=>void
}

export const Tabs = memo((props: TabsProps) => {
    const { t } = useTranslation();
    const {
        className, tabs, value, onTabsClick,
    } = props;
    const clickHandler = useCallback((tab:TabItem) => () => {
        onTabsClick(tab);
    }, [onTabsClick]);
    return (
        <div className={classNames(cls.Tabs, {}, [className])}>
            {tabs.map((tab, index) => (
                <Card onClick={clickHandler(tab)} theme={tab.value === value ? CardTheme.NORMAL : CardTheme.OUTLINED} key={tab.value}>
                    {tab.content}
                </Card>
            ))}
        </div>
    );
});
