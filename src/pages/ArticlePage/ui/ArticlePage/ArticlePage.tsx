import { ArticleList, ArticleViews } from 'entities/Article';
import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect';
import { ArticleViewSelector } from 'features/ArticleViewSelector';
import { Page } from 'shared/ui/Page/Page';
import { fetchNextArticlePage } from 'pages/ArticlePage/model/services/fetchNextArticlePage/fetchNextArticlePage';
import { fetchArticles } from '../../model/services/fetchArticles/fetchArticles';
import {
    getArticlesError, getArticlesIsLoading, getArticlesPageHasMore, getArticlesPageNumber, getArticlesViews,
} from '../../model/selectors/articles';
import { articlePageActions, articlesReducer, getArticles } from '../../model/slice/articlePageSlice';

const ArticlePage = memo(() => {
    const { t } = useTranslation('ArticlePage');
    const dispatch = useAppDispatch();
    const articles = useSelector(getArticles.selectAll);
    const isLoading = useSelector(getArticlesIsLoading);
    const error = useSelector(getArticlesError);
    const views = useSelector(getArticlesViews);
    const page = useSelector(getArticlesPageNumber);
    const hasMore = useSelector(getArticlesPageHasMore);
    const reducers:ReducersList = {
        articlePage: articlesReducer,
    };

    const onViewClick = useCallback((view:ArticleViews) => {
        dispatch(articlePageActions.setView(view));
    }, [dispatch]);

    useInitialEffect(() => {
        dispatch(articlePageActions.initState());
        dispatch(fetchArticles({ page: 1 }));
    });
    const onNextLoad = useCallback(() => {
        dispatch(fetchNextArticlePage());
    }, [dispatch]);
    return (
        <DynamicModuleLoader reducers={reducers}>
            <Page onScrollEnd={onNextLoad}>
                {t('Article Page')}
                <ArticleViewSelector view={views} onViewClick={onViewClick} />
                <ArticleList articles={articles} isLoading={isLoading} views={views} />
            </Page>
        </DynamicModuleLoader>
    );
});

export default ArticlePage;
