import { ArticleList } from 'entities/Article';
import { fetchArticles } from 'pages/ArticlePage/model/services/fetchArticles';

import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect';
import { getArticlesError, getArticlesIsLoading } from 'pages/ArticlePage/model/selectors/articles';
import { articlesReducer, getArticles } from '../../model/slice/articlePageSlice';

const ArticlePage = memo(() => {
    const { t } = useTranslation('ArticlePage');
    const dispatch = useAppDispatch();
    const articles = useSelector(getArticles.selectAll);
    const isLoading = useSelector(getArticlesIsLoading);
    const error = useSelector(getArticlesError);
    const reducers:ReducersList = {
        articlePage: articlesReducer,
    };
    useInitialEffect(() => {
        dispatch(fetchArticles());
    });
    return (
        <DynamicModuleLoader reducers={reducers}>
            {t('Article Page')}
            <ArticleList articles={articles} />
        </DynamicModuleLoader>
    );
});

export default ArticlePage;
