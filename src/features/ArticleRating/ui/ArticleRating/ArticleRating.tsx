import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ArticleRating.module.scss';
import { RatingCard } from '@/entities/Rating';
import { useGetRatings, usePostRatings } from '../../api/articleRatingApi';
import { getAuthUserData } from '@/entities/User';
import { Sceleton } from '@/shared/ui/Sceleton';

export interface ArticleRatingProps {
    className?: string;
    articleId: string;
}

const ArticleRating = memo((props: ArticleRatingProps) => {
    const { t } = useTranslation();
    const userData = useSelector(getAuthUserData);
    const { className, articleId = '1' } = props;
    const { data, isLoading, error } = useGetRatings({ articleId, userId: userData?.id });
    const [rateArticleMutation] = usePostRatings();

    const onMutationRatins = useCallback(
        (starsCount: number, feedback?: string) => {
            rateArticleMutation({
                articleId,
                feedback: feedback ?? '',
                rate: starsCount,
                userId: userData?.id ?? '1',
            });
        },
        [articleId, rateArticleMutation, userData?.id],
    );

    const onAccept = useCallback(
        (starsCount: number, feedback?: string) => {
            onMutationRatins(starsCount, feedback);
        },
        [onMutationRatins],
    );

    const onCancel = useCallback(
        (starsCount: number) => {
            onMutationRatins(starsCount);
        },
        [onMutationRatins],
    );

    if (isLoading) {
        return <Sceleton height={200} width={200} />;
    }
    const rate = data?.[0];
    return (
        <RatingCard
            onAccept={onAccept}
            onCancel={onCancel}
            rate={rate?.rate}
            className={classNames(cls.ArticleRating, {}, [className])}
        />
    );
});
export default ArticleRating;
