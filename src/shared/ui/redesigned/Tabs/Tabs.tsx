import { memo, ReactNode, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Tabs.module.scss';
import { Card } from '../Card';
import { Flex, FlexDirection } from '../Stack/Flex/Flex';

export interface TabItem {
    value: string;
    content: ReactNode;
}
export interface TabsProps {
    className?: string;
    tabs: TabItem[];
    value: string;
    onTabsClick: (tab: TabItem) => void;
    direction?: FlexDirection;
}

export const Tabs = memo((props: TabsProps) => {
    const { t } = useTranslation();
    const { className, tabs, value, onTabsClick, direction = 'row' } = props;
    const clickHandler = useCallback(
        (tab: TabItem) => () => {
            onTabsClick(tab);
        },
        [onTabsClick],
    );
    return (
        <Flex gap={8} align="start" direction={direction} className={classNames(cls.Tabs, {}, [className])}>
            {tabs.map((tab, index) => {
                const isSelected = tab.value === value;
                return (
                    <Card
                        onClick={clickHandler(tab)}
                        variant={isSelected ? 'light' : 'outlined'}
                        key={tab.value}
                        border="round"
                        className={classNames(cls.tab, { [cls.selected]: isSelected })}
                    >
                        {tab.content}
                    </Card>
                );
            })}
        </Flex>
    );
});
