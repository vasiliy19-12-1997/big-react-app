import { ArtcileDetails } from 'entities/Article';
import { ArticleRecomendationList } from 'features/ArticleRecomendationList/ui/ArticleRecomendationList/ArticleRecomendationList';
import { ArticleDetailsComments } from 'pages/ArticleDetailsComments/ArticleDetailsComments';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect';
import { Page } from 'widgets/Page/Page';
import { articleDetailsReducer } from '../../model/selectors';
import { fetchArticlesRecommends } from '../../model/services/fetchArticlesRecommends';
import { fetchCommentsByArticleId } from '../../model/services/fetchCommentsByArticleId';
import { ArticlePageDetailsHeader } from '../ArticlePageDetailsHeader/ArticlePageDetailsHeader';

const ArticlePageDetails = memo(() => {
    const { t } = useTranslation('ArticlePageDetails');
    const { id } = useParams<{id?:string}>();
    const dispatch = useDispatch();
    const reducers:ReducersList = {
        articlePageDetails: articleDetailsReducer,
    };

    useInitialEffect(() => {
        dispatch(fetchCommentsByArticleId(id));
        dispatch(fetchArticlesRecommends());
    }, [dispatch, id]);

    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
            <Page>
                {t('Article Page Details')}
                <ArticlePageDetailsHeader />
                <ArtcileDetails id={id} />
                <ArticleRecomendationList />
                <ArticleDetailsComments id={id} />
            </Page>
        </DynamicModuleLoader>
    );
});

export default ArticlePageDetails;
