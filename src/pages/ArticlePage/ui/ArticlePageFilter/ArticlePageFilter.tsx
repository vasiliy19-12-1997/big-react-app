import {
    ArticlePageTabs,
    ArticleSortField,
    ArticleSortSelector,
    ArticleType,
    ArticleViews, getFilterSelectorOrder, getFilterSelectorSearch, getFilterSelectorSort,
} from '@/entities/Article';
import { ArticleViewSelector } from '@/features/ArticleViewSelector';
import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useDebounce } from '@/shared/lib/hooks/useDebounce/useDebounce';
import { SortOrder } from '@/shared/types';
import { Card } from '@/shared/ui/Card/Card';
import { Input } from '@/shared/ui/Input/Input';
import { getArticlesPageType, getArticlesViews } from '../../model/selectors/articles';
import { fetchArticles } from '../../model/services/fetchArticles/fetchArticles';
import { articlePageActions } from '../../model/slice/articlePageSlice';
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
    const type = useSelector(getArticlesPageType);
    const fetchData = useCallback(() => {
        dispatch(fetchArticles({ replace: true }));
    }, [dispatch]);
    const fetchDebounce = useDebounce(fetchData, 500);

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
        fetchDebounce();
    }, [dispatch, fetchDebounce]);

    const onChangeArticleType = useCallback((tab:ArticleType) => {
        dispatch(articlePageActions.setType(tab));
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
            <ArticlePageTabs className={cls.tabs} onChangeType={onChangeArticleType} value={type} />
        </div>
    );
});
