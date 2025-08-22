import {
    ArticleSortField,
    ArticleSortSelector,
    ArticleViews, getFilterSelectorOrder, getFilterSelectorSearch, getFilterSelectorSort,
} from 'entities/Article';
import { ArticleViewSelector } from 'features/ArticleViewSelector';
import { getArticlesViews } from 'pages/ArticlePage/model/selectors/articles';
import { articlePageActions } from 'pages/ArticlePage/model/slice/articlePageSlice';
import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { classNames } from 'shared/lib/classNames/classNames';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { SortOrder } from 'shared/types';
import { Card } from 'shared/ui/Card/Card';
import { Input } from 'shared/ui/Input/Input';
import { fetchArticles } from 'pages/ArticlePage/model/services/fetchArticles/fetchArticles';
import cls from './ArticlePageFilter.module.scss';

interface ArticlePageFilterProps {
  className?: string;
}

export const ArticlePageFilter = memo((props: ArticlePageFilterProps) => {
    const { t } = useTranslation();
    const { className } = props;
    const dispatch = useAppDispatch();
    const views = useSelector(getArticlesViews);
    const sort = useSelector(getFilterSelectorSort);
    const order = useSelector(getFilterSelectorOrder);
    const search = useSelector(getFilterSelectorSearch);

    const fetchData = useCallback(() => {
        dispatch(fetchArticles({ replace: true }));
    }, [dispatch]);

    const onViewClick = useCallback((view:ArticleViews) => {
        dispatch(articlePageActions.setView(view));
    }, [dispatch]);

    const onChangeOrder = useCallback((newOrder:SortOrder) => {
        dispatch(articlePageActions.setOrder(newOrder));
        dispatch(articlePageActions.setPage(1));
        fetchData();
    }, [dispatch, fetchData]);

    const onChangeSort = useCallback((sort:ArticleSortField) => {
        dispatch(articlePageActions.setSort(sort));
        dispatch(articlePageActions.setPage(1));
        fetchData();
    }, [dispatch, fetchData]);

    const onChangeSearch = useCallback((search:string) => {
        dispatch(articlePageActions.setSearch(search));
        dispatch(articlePageActions.setPage(1));
        fetchData();
    }, [dispatch, fetchData]);

    return (
        <div className={classNames(cls.ArticlePageFilter, {}, [className])}>
            <div className={cls.sortWrapper}>
                <ArticleSortSelector sort={sort} order={order} onChangeOrder={onChangeOrder} onChangeSort={onChangeSort} />
                <ArticleViewSelector view={views} onViewClick={onViewClick} />
            </div>
            <Card className={cls.search}>
                <Input placeholder={t('Поиск')} value={search} onChange={onChangeSearch} />
            </Card>
        </div>
    );
});
