import { memo, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import { TabItem, Tabs } from '@/shared/ui/Tabs';
import { ArticleType } from '../../model/types/artcile';

interface ArticlePageTabsProps {
  className?: string;
  value:ArticleType;
  onChangeType:(value:ArticleType)=>void
}

export const ArticlePageTabs = memo((props: ArticlePageTabsProps) => {
    const { t } = useTranslation();
    const { className, value, onChangeType } = props;

    const tabs = useMemo<TabItem[]>(() => [
        {
            value: ArticleType.ALL,
            content: t('Все статьи'),
        },
        {
            value: ArticleType.IT,
            content: t('Айти'),
        },
        {
            value: ArticleType.ECONOMICS,
            content: t('Экономика'),
        },
        {
            value: ArticleType.SCIENCE,
            content: t('Наука'),
        },

    ], [t]);
    const onClickTab = useCallback((tab:TabItem) => {
        onChangeType(tab.value as ArticleType);
    }, [onChangeType]);
    return (
        <Tabs onTabsClick={onClickTab} value={value} tabs={tabs} className={classNames('', {}, [className])} />
    );
});
