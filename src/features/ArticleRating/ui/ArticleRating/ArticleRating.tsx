import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ArticleRating.module.scss';
import { RatingCard } from '@/entities/Rating';
import { useGetRatings } from '../../api/articleRatingApi';
import { getAuthUserData } from '@/entities/User';
import { Sceleton } from '@/shared/ui/Sceleton/Sceleton';

interface ArticleRatingProps {
  className?: string;
  articleId:string;
}

export const ArticleRating = memo((props: ArticleRatingProps) => {
    const { t } = useTranslation();
    const userData = useSelector(getAuthUserData);
    const { className, articleId = '1' } = props;
    const { data, isLoading, error } = useGetRatings({ articleId, userId: userData?.id });
    if (isLoading) {
        return (
            <Sceleton height={200} width={200} />
        );
    }
    const rate = data?.[0];
    console.log(rate?.rate);
    return (
        <RatingCard rate={rate?.rate} className={classNames(cls.ArticleRating, {}, [className])} />
    );
});
