import { ArticleList, ArticleViews } from 'entities/Article';
import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect';
import { ArticleViewSelector } from 'features/ArticleViewSelector';
import { fetchArticles } from '../../model/services/fetchArticles';
import { getArticlesError, getArticlesIsLoading, getArticlesViews } from '../../model/selectors/articles';
import { articlePageActions, articlesReducer, getArticles } from '../../model/slice/articlePageSlice';

const ArticlePage = memo(() => {
    const { t } = useTranslation('ArticlePage');
    const dispatch = useAppDispatch();
    const articles = useSelector(getArticles.selectAll);
    const isLoading = useSelector(getArticlesIsLoading);
    const error = useSelector(getArticlesError);
    const views = useSelector(getArticlesViews);
    const reducers:ReducersList = {
        articlePage: articlesReducer,
    };
    useInitialEffect(() => {
        dispatch(fetchArticles());
        dispatch(articlePageActions.initState());
    });
    const onViewClick = useCallback((view:ArticleViews) => {
        dispatch(articlePageActions.setView(view));
    }, [dispatch]);
    return (
        <DynamicModuleLoader reducers={reducers}>
            {t('Article Page')}
            <ArticleViewSelector view={views} onViewClick={onViewClick} />
            <ArticleList articles={articles} isLoading={isLoading} views={views} />
        </DynamicModuleLoader>
    );
});

export default ArticlePage;
