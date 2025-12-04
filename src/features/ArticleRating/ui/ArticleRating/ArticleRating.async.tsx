import { lazy, Suspense } from 'react';
import { ArticleRatingProps } from './ArticleRating';
import { Sceleton } from '@/shared/ui/Sceleton';

export const ArticleRatingLazy = lazy(() => import('./ArticleRating'));

export const ArticleRatingAsync = (props:ArticleRatingProps) => {
    return (
        <Suspense fallback={(<Sceleton width={200} height={200} />)}>
            <ArticleRatingLazy {...props} />
        </Suspense>
    );
};
