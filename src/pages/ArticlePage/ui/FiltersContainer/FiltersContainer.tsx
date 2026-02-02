import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { ArticlesFilters } from '@/widgets/ArticlesFilters';
import { useArticleFilters } from '../../lib/hooks/useArticleFilters';

interface FiltersContainerProps {
    className?: string;
}

export const FiltersContainer = memo((props: FiltersContainerProps) => {
    const { t } = useTranslation();
    const { className } = props;
    const { sort, order, search, type, onChangeOrder, onChangeSort, onChangeSearch, onChangeArticleType } =
        useArticleFilters();
    return (
        <ArticlesFilters
            sort={sort}
            order={order}
            search={search}
            type={type}
            onChangeOrder={onChangeOrder}
            onChangeSort={onChangeSort}
            onChangeSearch={onChangeSearch}
            className={className}
            onChangeType={onChangeArticleType}
        />
    );
});
