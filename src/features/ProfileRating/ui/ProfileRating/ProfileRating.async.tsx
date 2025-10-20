import { lazy, Suspense } from 'react';
import { ProfileRatingProps } from './ProfileRating';
import { Sceleton } from '@/shared/ui/Sceleton/Sceleton';

export const ProfileRatingLazy = lazy(() => import('./ProfileRating'));

export const ProfileRatingAsync = (props:ProfileRatingProps) => {
    return (
        <Suspense fallback={(<Sceleton width={200} height={200} />)}>
            <ProfileRatingLazy {...props} />
        </Suspense>
    );
};
