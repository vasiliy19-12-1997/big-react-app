import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { ArtcileDetails } from '@/entities/Article';
import { ArticleRating } from '@/features/ArticleRating';
import { ArticleRecomendationList } from '@/features/ArticleRecomendationList';
import { DynamicModuleLoader, ReducersList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect';
import { Page } from '@/shared/ui/Page';
import { ArticleDetailsComments } from '../../../ArticleDetailsComments';
import { fetchArticlesRecommends } from '../../model/services/fetchArticlesRecommends';
import { fetchCommentsByArticleId } from '../../model/services/fetchCommentsByArticleId';
import { ArticlePageDetailsHeader } from '../ArticlePageDetailsHeader/ArticlePageDetailsHeader';
import { articlePageDetailsReducer } from '../../model/slice';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { toggleFeatures } from '@/shared/features';
import { Card } from '@/shared/ui/Card';

const ArticlePageDetails = memo(() => {
    const { t } = useTranslation('ArticlePageDetails');
    const { id } = useParams<{ id?: string }>();
    const dispatch = useAppDispatch();
    const reducers: ReducersList = {
        articlePageDetails: articlePageDetailsReducer,
    };
    useInitialEffect(() => {
        dispatch(fetchCommentsByArticleId(id));
        dispatch(fetchArticlesRecommends());
    }, [dispatch, id]);

    if (!id) {
        return null;
    }

    const articleRatingCard = toggleFeatures({
        name: 'isArticleRatingEnabled',
        on: () => <ArticleRating articleId={id} />,
        off: () => <Card>{t('Карточка рейтинга статьи')}</Card>,
    });
    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
            <Page>
                {t('Article Page Details')}
                <ArticlePageDetailsHeader />
                <ArtcileDetails id={id} />
                {articleRatingCard}
                <ArticleRecomendationList />
                <ArticleDetailsComments id={id} />
            </Page>
        </DynamicModuleLoader>
    );
});

export default ArticlePageDetails;
