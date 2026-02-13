import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { RatingCard } from '@/entities/Rating';
import { getAuthUserData } from '@/entities/User';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Sceleton as SceletonRedesign } from '@/shared/ui/deprecated/Sceleton';
import { useGetRatingsProfile, usePostRatingsProfile } from '../../api/profileRatingApi';
import cls from './ProfileRating.module.scss';
import { ToggleFeatures } from '@/shared/features';
import { Sceleton } from '@/shared/ui/redesigned/Sceleton';

export interface ProfileRatingProps {
    className?: string;
    profileId?: string;
}

const ProfileRating = memo((props: ProfileRatingProps) => {
    const { t } = useTranslation();
    const userData = useSelector(getAuthUserData);
    const { className, profileId = '1' } = props;
    const { data, isLoading, error } = useGetRatingsProfile({ profileId, userId: userData?.id });
    const [rateArticleMutation] = usePostRatingsProfile();

    const onMutationRatings = useCallback(
        (starsCount: number, feedback?: string) => {
            rateArticleMutation({
                profileId,
                feedback: feedback ?? '',
                rate: starsCount,
                userId: userData?.id ?? '1',
            });
        },
        [profileId, rateArticleMutation, userData?.id],
    );

    const onAccept = useCallback(
        (starsCount: number, feedback?: string) => {
            onMutationRatings(starsCount, feedback);
        },
        [onMutationRatings],
    );

    const onCancel = useCallback(
        (starsCount: number) => {
            onMutationRatings(starsCount);
        },
        [onMutationRatings],
    );

    if (isLoading) {
        return (
            <ToggleFeatures
                name="isNewDesignEnabled"
                on={<Sceleton width="100%" height={200} />}
                off={<SceletonRedesign height={200} width={200} />}
            />
        );
    }
    const rate = data?.[0];
    return (
        <RatingCard
            onAccept={onAccept}
            onCancel={onCancel}
            rate={rate?.rate}
            className={classNames(cls.ProfileRating, {}, [className])}
        />
    );
});
export default ProfileRating;
