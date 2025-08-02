import { ArtcileDetails } from 'entities/Article';
import { CommentaryList } from 'entities/Сommentary';
import { AddCommentForm } from 'features/AddCommentForm';
import { getArticleDetailsCommentsError, getArticleDetailsCommentsIsLoading } from 'pages/ArticlePageDetails/model/selectors/comments';
import { addCommentForArticle } from 'pages/ArticlePageDetails/model/services/addCommentForArticle';
import { fetchCommentsByArticleId } from 'pages/ArticlePageDetails/model/services/fetchCommentsByArticleId';
import { articleDetailsCommentsReducer, getArticleComments } from 'pages/ArticlePageDetails/model/slice/ArticleDetailsCommentSlice';
import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect';
import { Text } from 'shared/ui/Text/Text';
import cls from './ArticlePageDetails.module.scss';

const ArticlePageDetails = memo(() => {
    const { t } = useTranslation('ArticlePageDetails');
    const { id } = useParams<{id?:string}>();
    const isLoading = useSelector(getArticleDetailsCommentsIsLoading);
    console.log(`isLoading${isLoading}`);
    const error = useSelector(getArticleDetailsCommentsError);
    const dispatch = useDispatch();
    const reducers:ReducersList = {
        articleDetailsComments: articleDetailsCommentsReducer,
    };
    const comments = useSelector(getArticleComments.selectAll);
    useInitialEffect(() => {
        dispatch(fetchCommentsByArticleId(id));
    });
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
            <div>
                {t('Article Page Details')}
                <ArtcileDetails id={id} />
                <Text title={t('Комментарии')} className={cls.comments} />
                <AddCommentForm onSendComments={onSendComments} />
                <CommentaryList isLoading={isLoading} comments={comments} />
            </div>
        </DynamicModuleLoader>
    );
});

export default ArticlePageDetails;
