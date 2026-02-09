import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { ArtcileDetails } from '@/entities/Article';
import { ArticleRating } from '@/features/ArticleRating';
import { ArticleRecomendationList } from '@/features/ArticleRecomendationList';
import { ToggleFeatures } from '@/shared/features';
import { StickyContentLayout } from '@/shared/layouts/StickyContentLayout';
import { classNames } from '@/shared/lib/classNames/classNames';
import { DynamicModuleLoader, ReducersList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect';
import { Page } from '@/shared/ui/deprecated/Page';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { ArticleDetailsComments } from '../../../ArticleDetailsComments';
import { fetchArticlesRecommends } from '../../model/services/fetchArticlesRecommends';
import { fetchCommentsByArticleId } from '../../model/services/fetchCommentsByArticleId';
import { articlePageDetailsReducer } from '../../model/slice';
import { ArticlePageDetailsHeader } from '../ArticlePageDetailsHeader/ArticlePageDetailsHeader';
import { DetailsContainer } from '../DetailsContainer/DetailsContainer';
import cls from './ArticlePageDetails.module.scss';
import { AdditionalInfoContainer } from '../AdditionalInfoContainer/AdditionalInfoContainer';

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

    // const articleRatingCard = toggleFeatures({
    //     name: 'isArticleRatingEnabled',
    //     on: () => <ArticleRating articleId={id} />,
    //     off: () => <Card>{t('Карточка рейтинга статьи')}</Card>,
    // });

    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
            <ToggleFeatures
                name="isNewDesignEnabled"
                on={
                    <StickyContentLayout
                        content={
                            <Page className={classNames(cls.ArticleDetailsPage, {}, [])}>
                                <VStack gap={16}>
                                    <DetailsContainer />
                                    <ArticleRating articleId={id} />
                                    <ArticleRecomendationList />
                                    <ArticleDetailsComments id={id} />
                                </VStack>
                            </Page>
                        }
                        right={<AdditionalInfoContainer />}
                    />
                }
                off={
                    <Page>
                        {t('Article Page Details')}
                        <ArticlePageDetailsHeader />
                        <ArtcileDetails id={id} />
                        <ArticleRating articleId={id} />
                        <ArticleRecomendationList />
                        <ArticleDetailsComments id={id} />
                    </Page>
                }
            />
        </DynamicModuleLoader>
    );
});

export default ArticlePageDetails;
