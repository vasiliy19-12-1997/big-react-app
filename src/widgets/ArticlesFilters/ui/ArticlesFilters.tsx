import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { ArticleSortField, ArticleType } from '@/entities/Article';
import { ArticlePageTabs } from '@/features/ArticlePageTabs';
import { ArticleSortSelector } from '@/features/ArticleSortSelector';
import { classNames } from '@/shared/lib/classNames/classNames';
import { SortOrder } from '@/shared/types/sort';
import { Card } from '@/shared/ui/redesigned/Card';
import { VStack } from '@/shared/ui/redesigned/Stack';
import cls from './ArticlesFilters.module.scss';
import { Input } from '@/shared/ui/redesigned/Input';
import SearchIcon from '@/shared/assets/icons/search.svg';
import { Icon } from '@/shared/ui/redesigned/Icon';

interface ArticlesFiltersProps {
    className?: string;
    sort: ArticleSortField;
    order: SortOrder;
    type: ArticleType;
    search: string;
    onChangeSort: (newSort: ArticleSortField) => void;
    onChangeOrder: (newOrder: SortOrder) => void;
    onChangeType: (type: ArticleType) => void;
    onChangeSearch: (value: string) => void;
}

export const ArticlesFilters = memo((props: ArticlesFiltersProps) => {
    const { t } = useTranslation();
    const { className, sort, order, type, search, onChangeSort, onChangeOrder, onChangeType, onChangeSearch } = props;

    return (
        <Card className={classNames(cls.ArticlesFilters, {}, [className])} padding="24">
            <VStack gap={32}>
                <Input addonLeft={<Icon  Svg={SearchIcon}/> } placeholder={t('Поиск')} value={search} onChange={onChangeSearch} />
                <ArticlePageTabs className={cls.tabs} onChangeType={onChangeType} value={type} />
                <ArticleSortSelector
                    sort={sort}
                    order={order}
                    onChangeOrder={onChangeOrder}
                    onChangeSort={onChangeSort}
                />
            </VStack>
        </Card>
    );
});
