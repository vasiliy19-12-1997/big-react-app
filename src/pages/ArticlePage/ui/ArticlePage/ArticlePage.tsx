import { Article, ArticleList } from 'entities/Article';
import { fetchArticles } from 'features/AddCommentForm/model/services/fetchArticles';
import { articlesReducer, getArticles } from 'pages/ArticlePage/model/slice/articlePageSlice';

import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect';

const ArticlePage = memo(() => {
    const { t } = useTranslation('ArticlePage');
    const dispatch = useAppDispatch();
    const articles = useSelector(getArticles.selectAll);
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
