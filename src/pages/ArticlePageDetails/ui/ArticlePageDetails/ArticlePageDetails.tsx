import { ArtcileDetails, ArticleList } from 'entities/Article';
import { CommentaryList } from 'entities/Сommentary';
import { AddCommentForm } from 'features/AddCommentForm';
import { articleDetailsReducer } from 'pages/ArticlePageDetails/model/selectors';
import { getArticleDetailsRecommendError, getArticleDetailsRecommendIsLoading } from 'pages/ArticlePageDetails/model/selectors/recommends/recommends';
import { fetchArticlesRecommends } from 'pages/ArticlePageDetails/model/services/fetchArticlesRecommends';
import { getRecommend } from 'pages/ArticlePageDetails/model/slice/ArticleDetailsRecommendSlice';
import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect';
import { Button } from 'shared/ui/Button/Button';
import { Text } from 'shared/ui/Text/Text';
import { Page } from 'widgets/Page/Page';
import { getArticleDetailsCommentsIsLoading } from '../../model/selectors/comments/comments';
import { addCommentForArticle } from '../../model/services/addCommentForArticle';
import { fetchCommentsByArticleId } from '../../model/services/fetchCommentsByArticleId';
import { getArticleComments } from '../../model/slice/ArticleDetailsCommentSlice';
import cls from './ArticlePageDetails.module.scss';
import { ArticlePageDetailsHeader } from '../ArticlePageDetailsHeader/ArticlePageDetailsHeader';

const ArticlePageDetails = memo(() => {
    const { t } = useTranslation('ArticlePageDetails');
    const { id } = useParams<{id?:string}>();
    const isLoading = useSelector(getArticleDetailsCommentsIsLoading);
    const dispatch = useDispatch();

    const comments = useSelector(getArticleComments.selectAll);
    const recommends = useSelector(getRecommend.selectAll);
    const isLoadingRecommends = useSelector(getArticleDetailsRecommendIsLoading);
    const errorRecommends = useSelector(getArticleDetailsRecommendError);
    const reducers:ReducersList = {
        articlePageDetails: articleDetailsReducer,
    };
    useInitialEffect(() => {
        dispatch(fetchCommentsByArticleId(id));
        dispatch(fetchArticlesRecommends());
    }, [dispatch, id]);
    const onSendComments = useCallback((text:string) => {
        dispatch(addCommentForArticle(text));
    }, [dispatch]);

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
                <Text title={t('Рекомендации')} />
                <ArticleList target="_blank" className={cls.recommends} articles={recommends} isLoading={isLoadingRecommends} />
                <Text title={t('Комментарии')} className={cls.comments} />
                <AddCommentForm onSendComments={onSendComments} />
                <CommentaryList isLoading={isLoading} comments={comments} />
            </Page>
        </DynamicModuleLoader>
    );
});

export default ArticlePageDetails;
