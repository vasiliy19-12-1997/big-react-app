import {
    ArticleList, ArticleSortSelector,
} from 'entities/Article';
import { fetchNextArticlePage } from 'pages/ArticlePage/model/services/fetchNextArticlePage/fetchNextArticlePage';
import { ininArticlePage } from 'pages/ArticlePage/model/services/ininArticlePage/ininArticlePage';
import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect';
import { Page } from 'widgets/Page/Page';
import { useSearchParams } from 'react-router-dom';
import {
    getArticlesIsLoading,
    getArticlesViews,
} from '../../model/selectors/articles';
import { articlesReducer, getArticles } from '../../model/slice/articlePageSlice';
import { ArticlePageFilter } from '../ArticlePageFilter/ArticlePageFilter';
import cls from './ArticlePage.module.scss';

const ArticlePage = memo(() => {
    const { t } = useTranslation('ArticlePage');
    const dispatch = useAppDispatch();
    const [searchParams] = useSearchParams();
    const articles = useSelector(getArticles.selectAll);
    const isLoading = useSelector(getArticlesIsLoading);
    const views = useSelector(getArticlesViews);
    const reducers:ReducersList = {
        articlePage: articlesReducer,
    };

    useInitialEffect(() => {
        dispatch(ininArticlePage(searchParams));
    }, [dispatch, searchParams]);

    const onNextLoad = useCallback(() => {
        dispatch(fetchNextArticlePage());
    }, [dispatch]);

    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount={false}>
            <Page onScrollEnd={onNextLoad}>
                {t('Article Page')}
                <ArticlePageFilter />
                <ArticleList className={cls.list} articles={articles} isLoading={isLoading} views={views} />
            </Page>
        </DynamicModuleLoader>
    );
});

export default ArticlePage;
