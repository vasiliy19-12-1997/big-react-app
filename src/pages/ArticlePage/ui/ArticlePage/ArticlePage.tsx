import { ArticleList, ArticleViews } from 'entities/Article';
import { ArticleViewSelector } from 'features/ArticleViewSelector';
import { fetchNextArticlePage } from 'pages/ArticlePage/model/services/fetchNextArticlePage/fetchNextArticlePage';
import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect';
import { Page } from 'widgets/Page/Page';
import { ininArticlePage } from 'pages/ArticlePage/model/services/ininArticlePage/ininArticlePage';
import {
    getArticlesIsLoading,
    getArticlesPageInited,
    getArticlesViews,
} from '../../model/selectors/articles';
import { fetchArticles } from '../../model/services/fetchArticles/fetchArticles';
import { articlePageActions, articlesReducer, getArticles } from '../../model/slice/articlePageSlice';

const ArticlePage = memo(() => {
    const { t } = useTranslation('ArticlePage');
    const dispatch = useAppDispatch();
    const articles = useSelector(getArticles.selectAll);
    const isLoading = useSelector(getArticlesIsLoading);
    const views = useSelector(getArticlesViews);
    const reducers:ReducersList = {
        articlePage: articlesReducer,
    };

    const onViewClick = useCallback((view:ArticleViews) => {
        dispatch(articlePageActions.setView(view));
    }, [dispatch]);
    useInitialEffect(() => {
        dispatch(ininArticlePage());
    });
    const onNextLoad = useCallback(() => {
        dispatch(fetchNextArticlePage());
    }, [dispatch]);
    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount={false}>
            <Page onScrollEnd={onNextLoad}>
                {t('Article Page')}
                <ArticleViewSelector view={views} onViewClick={onViewClick} />
                <ArticleList articles={articles} isLoading={isLoading} views={views} />
            </Page>
        </DynamicModuleLoader>
    );
});

export default ArticlePage;
