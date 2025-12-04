import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { ArticleList } from '@/entities/Article';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect';
import { Text } from '@/shared/ui/Text';
import { getArticlesError, getArticlesIsLoading, getArticlesViews } from '../../model/selectors/articles';
import { ininArticlePage } from '../../model/services/ininArticlePage/ininArticlePage';
import { getArticles } from '../../model/slice/articlePageSlice';

interface ArticleInfiniteListProps {
  className?: string;
}

export const ArticleInfiniteList = memo((props: ArticleInfiniteListProps) => {
    const { t } = useTranslation();
    const articles = useSelector(getArticles.selectAll);
    const isLoading = useSelector(getArticlesIsLoading);
    const error = useSelector(getArticlesError);
    const views = useSelector(getArticlesViews);
    const [searchParams] = useSearchParams();
    const dispatch = useAppDispatch();
    const { className } = props;

    useInitialEffect(() => {
        dispatch(ininArticlePage(searchParams));
    }, [dispatch, searchParams]);

    if (error) {
        <Text title={t('Произошла ошибка')} />;
    }
    return (
        <ArticleList className={className} articles={articles} isLoading={isLoading} views={views} />
    );
});
