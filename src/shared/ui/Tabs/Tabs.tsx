import { classNames } from 'shared/lib/classNames/classNames';
import { memo, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import cls from './Tabs.module.scss';
import { Card } from '../Card/Card';

interface TabItem{
  value:string,
  content:ReactNode
}
interface TabsProps {
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

    return (
        <div className={classNames(cls.Tabs, {}, [className])}>
            {tabs.map((tab, index) => (
                <Card key={tab.value}>
                    {tab.content}
                </Card>
            ))}
        </div>
    );
});
