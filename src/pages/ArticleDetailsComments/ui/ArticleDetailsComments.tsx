import { memo, Suspense, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { CommentaryList } from '@/entities/Сommentary';
import { AddCommentForm } from '@/features/AddCommentForm';
import {
    addCommentForArticle, fetchCommentsByArticleId,
    getArticleComments,
    getArticleDetailsCommentsIsLoading, getArticleDetailsRecommendError,
} from '@/pages/ArticlePageDetails';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect';
import { Sceleton } from '@/shared/ui/Sceleton/Sceleton';
import { VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text/Text';

interface ArticleDetailsCommentsProps {
  className?: string;
  id?:string
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
        <VStack gap={16} max>
            <Text title={t('Комментарии')} />
            <Suspense fallback={<Sceleton width={200} height={200} />}>
                <AddCommentForm onSendComments={onSendComments} />
            </Suspense>
            <CommentaryList isLoading={isLoading} comments={comments} />
        </VStack>
    );
});
