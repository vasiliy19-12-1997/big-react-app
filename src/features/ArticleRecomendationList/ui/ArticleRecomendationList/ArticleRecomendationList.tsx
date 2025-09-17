import { ArticleList } from 'entities/Article';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { rtqApi } from 'shared/config/api/rtqApi';
import { classNames } from 'shared/lib/classNames/classNames';
import { VStack } from 'shared/ui/Stack';
import { Text } from 'shared/ui/Text/Text';

interface ArticleRecomendationListProps {
    className?: string;
}
const recommendationApi = rtqApi.injectEndpoints({
    endpoints: (build) => ({
        getArticleRecommendationList: build.query({
            query: (limit) => ({
                url: '/articles',
                params: {
                    _limit: limit,
                },
            }),
        }),
    }),
});
const userArticleRecommendationList = recommendationApi.useGetArticleRecommendationListQuery;
export const ArticleRecomendationList = memo((props: ArticleRecomendationListProps) => {
    const { className } = props;
    const { t } = useTranslation();
    const { data, isLoading } = userArticleRecommendationList(10);
    return (
        <VStack gap={8} className={classNames('', {}, [className])}>
            <Text title={t('Рекомендации')} />
            <ArticleList target="_blank" articles={data} isLoading={isLoading} />
        </VStack>
    );
});
