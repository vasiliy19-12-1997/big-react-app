import { ArtcileDetails } from 'entities/Article';
import { CommentaryList } from 'entities/Сommentary';
import { AddCommentForm } from 'features/AddCommentForm';
import { ArticleRecomendationList } from 'features/ArticleRecomendationList/ui/ArticleRecomendationList/ArticleRecomendationList';
import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect';
import { Text } from 'shared/ui/Text/Text';
import { Page } from 'widgets/Page/Page';
import { ArticleDetailsComments } from 'pages/ArticleDetailsComments/ArticleDetailsComments';
import { articleDetailsReducer } from '../../model/selectors';
import { getArticleDetailsCommentsIsLoading } from '../../model/selectors/comments/comments';
import { getArticleDetailsRecommendError } from '../../model/selectors/recommends/recommends';
import { addCommentForArticle } from '../../model/services/addCommentForArticle';
import { fetchArticlesRecommends } from '../../model/services/fetchArticlesRecommends';
import { fetchCommentsByArticleId } from '../../model/services/fetchCommentsByArticleId';
import { getArticleComments } from '../../model/slice/ArticleDetailsCommentSlice';
import { ArticlePageDetailsHeader } from '../ArticlePageDetailsHeader/ArticlePageDetailsHeader';
import cls from './ArticlePageDetails.module.scss';

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

    if (!id) {
        return (
            <div>
                {t('Статья не найдена')}
            </div>
        );
    }

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
