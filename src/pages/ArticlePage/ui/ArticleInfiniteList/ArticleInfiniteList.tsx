import { ArticleList } from 'entities/Article';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { ininArticlePage } from '../../model/services/ininArticlePage/ininArticlePage';
import { getArticlesIsLoading, getArticlesViews } from '../../model/selectors/articles';
import { getArticles } from '../../model/slice/articlePageSlice';
import cls from './ArticleInfiniteList.module.scss';

interface ArticleInfiniteListProps {
  className?: string;
}

export const ArticleInfiniteList = memo((props: ArticleInfiniteListProps) => {
    const { t } = useTranslation();
    const articles = useSelector(getArticles.selectAll);
    const isLoading = useSelector(getArticlesIsLoading);
    const views = useSelector(getArticlesViews);
    const [searchParams] = useSearchParams();
    const dispatch = useAppDispatch();
    const { className } = props;
    useInitialEffect(() => {
        dispatch(ininArticlePage(searchParams));
    }, [dispatch, searchParams]);
    return (
        <ArticleList className={cls.list} articles={articles} isLoading={isLoading} views={views} />
    );
});
