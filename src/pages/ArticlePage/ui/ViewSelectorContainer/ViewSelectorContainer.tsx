import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { ArticleViews } from '@/entities/Article';
import { ArticleViewSelector } from '@/features/ArticleViewSelector';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { getArticlesViews } from '../../model/selectors/articles';
import { articlePageActions } from '../../model/slice/articlePageSlice';

interface ViewSelectorContainerProps {
    className?: string;
}

export const ViewSelectorContainer = memo((props: ViewSelectorContainerProps) => {
    const { t } = useTranslation();
    const { className } = props;
    const view = useSelector(getArticlesViews);
    const dispatch = useAppDispatch();
    const onViewClick = useCallback(
        (view: ArticleViews) => {
            dispatch(articlePageActions.setView(view));
        },
        [dispatch],
    );

    return <ArticleViewSelector view={view} onViewClick={onViewClick} />;
});
