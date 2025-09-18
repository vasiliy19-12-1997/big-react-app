import { CommentaryList } from 'entities/Сommentary';
import AddCommentForm from 'features/AddCommentForm/ui/AddCommentForm/AddCommentForm';
import { getArticleDetailsCommentsIsLoading } from 'pages/ArticlePageDetails/model/selectors/comments/comments';
import { getArticleDetailsRecommendError } from 'pages/ArticlePageDetails/model/selectors/recommends/recommends';
import { addCommentForArticle } from 'pages/ArticlePageDetails/model/services/addCommentForArticle';
import { fetchCommentsByArticleId } from 'pages/ArticlePageDetails/model/services/fetchCommentsByArticleId';
import { getArticleComments } from 'pages/ArticlePageDetails/model/slice/ArticleDetailsCommentSlice';
import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { classNames } from 'shared/lib/classNames/classNames';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect';
import { Text } from 'shared/ui/Text/Text';

interface ArticleDetailsCommentsProps {
  className?: string;
  id:string
}

export const ArticleDetailsComments = memo((props: ArticleDetailsCommentsProps) => {
    const { t } = useTranslation();
    const { className, id } = props;
    const isLoading = useSelector(getArticleDetailsCommentsIsLoading);
    const dispatch = useDispatch();
    const comments = useSelector(getArticleComments.selectAll);
    const errorRecommends = useSelector(getArticleDetailsRecommendError);

    const onSendComments = useCallback((text:string) => {
        dispatch(addCommentForArticle(text));
    }, [dispatch]);

    useInitialEffect(() => {
        dispatch(fetchCommentsByArticleId(id));
    }, [dispatch, id]);

    return (
        <div className={classNames('', {}, [className])}>
            <Text title={t('Комментарии')} />
            <AddCommentForm onSendComments={onSendComments} />
            <CommentaryList isLoading={isLoading} comments={comments} />
        </div>
    );
});
