import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import {
    getArticlesPageType,
    getArticlesViews,
    getFilterSelectorOrder,
    getFilterSelectorSearch,
    getFilterSelectorSort,
} from '../../model/selectors/articles';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useDebounce } from '@/shared/lib/hooks/useDebounce/useDebounce';
import { SortOrder } from '@/shared/types/sort';
import { fetchArticles } from '../../model/services/fetchArticles/fetchArticles';
import { articlePageActions } from '../../model/slice/articlePageSlice';
import { ArticleSortField, ArticleType, ArticleViews } from '@/entities/Article';

export function useArticleFilters() {
    const dispatch = useAppDispatch();
    const view = useSelector(getArticlesViews);
    const sort = useSelector(getFilterSelectorSort);
    const order = useSelector(getFilterSelectorOrder);
    const search = useSelector(getFilterSelectorSearch);
    const type = useSelector(getArticlesPageType);

    const fetchData = useCallback(() => {
        dispatch(fetchArticles({ replace: true }));
    }, [dispatch]);

    const fetchDebounce = useDebounce(fetchData, 500);

    const onViewClick = useCallback(
        (view: ArticleViews) => {
            dispatch(articlePageActions.setView(view));
        },
        [dispatch],
    );

    const onChangeOrder = useCallback(
        (newOrder: SortOrder) => {
            dispatch(articlePageActions.setOrder(newOrder));
            dispatch(articlePageActions.setPage(1));
            fetchData();
        },
        [dispatch, fetchData],
    );

    const onChangeSort = useCallback(
        (sort: ArticleSortField) => {
            dispatch(articlePageActions.setSort(sort));
            dispatch(articlePageActions.setPage(1));
            fetchData();
        },
        [dispatch, fetchData],
    );

    const onChangeSearch = useCallback(
        (search: string) => {
            dispatch(articlePageActions.setSearch(search));
            dispatch(articlePageActions.setPage(1));
            fetchDebounce();
        },
        [dispatch, fetchDebounce],
    );

    const onChangeArticleType = useCallback(
        (tab: ArticleType) => {
            dispatch(articlePageActions.setType(tab));
            dispatch(articlePageActions.setPage(1));
            fetchData();
        },
        [dispatch, fetchData],
    );
    return {
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
    };
}
