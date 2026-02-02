import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { ArticleViewSelector } from '@/features/ArticleViewSelector';
import { useArticleFilters } from '../../lib/hooks/useArticleFilters';

interface ViewSelectorContainerProps {
    className?: string;
}

export const ViewSelectorContainer = memo((props: ViewSelectorContainerProps) => {
    const { t } = useTranslation();
    const { className } = props;
    const { view, onViewClick } = useArticleFilters();

    return <ArticleViewSelector view={view} onViewClick={onViewClick} />;
});
