import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { ArticlePageTabs } from '@/features/ArticlePageTabs';
import { ArticleSortSelector } from '@/features/ArticleSortSelector';
import { ArticleViewSelector } from '@/features/ArticleViewSelector';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Card } from '@/shared/ui/deprecated/Card';
import { Input } from '@/shared/ui/deprecated/Input';
import { useArticleFilters } from '../../lib/hooks/useArticleFilters';
import cls from './ArticlePageFilter.module.scss';

interface ArticlePageFilterProps {
    className?: string;
}

export const ArticlePageFilter = memo((props: ArticlePageFilterProps) => {
    const { t } = useTranslation();
    const { className } = props;
    const {
        view,
        sort,
        order,
        search,
        type,
        onViewClick,
        onChangeOrder,
        onChangeSort,
        onChangeSearch,
        onChangeArticleType,
    } = useArticleFilters();

    return (
        <div className={classNames(cls.ArticlePageFilter, {}, [className])}>
            <div className={cls.sortWrapper}>
                <ArticleSortSelector
                    sort={sort}
                    order={order}
                    onChangeOrder={onChangeOrder}
                    onChangeSort={onChangeSort}
                />
                <ArticleViewSelector view={view} onViewClick={onViewClick} />
            </div>
            <Card className={cls.search}>
                <Input placeholder={t('Поиск')} value={search} onChange={onChangeSearch} />
            </Card>
            <ArticlePageTabs className={cls.tabs} onChangeType={onChangeArticleType} value={type} />
        </div>
    );
});
