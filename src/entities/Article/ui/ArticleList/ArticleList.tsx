import { HTMLAttributeAnchorTarget, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Text, TextSize } from '@/shared/ui/deprecated/Text';
import { Article, ArticleView } from '../../model/types/artcile';
import { ArticleListItem } from '../ArticleListItem/ArticleListItem';
import { ArticleListItemSceleton } from '../ArticleListItem/ArticleListItemSceleton';
import cls from './ArticleList.module.scss';
import { ToggleFeatures } from '@/shared/features';
import { HStack } from '@/shared/ui/redesigned/Stack';

interface ArticleListProps {
    className?: string;
    isLoading?: boolean;
    articles: Article[];
    views?: ArticleView;
    target?: HTMLAttributeAnchorTarget;
    virtualized?: boolean;
}

export const ArticleList = memo((props: ArticleListProps) => {
    const { t } = useTranslation();
    const { className, articles, views = ArticleView.SMALL, isLoading, target, virtualized = true } = props;
    const getSceletons = (view: ArticleView) =>
        new Array(view === ArticleView.SMALL ? 9 : 3)
            .fill(0)
            .map((item, index) => <ArticleListItemSceleton view={view} key={String(index)} />);

    if (!isLoading && !articles.length) {
        return (
            <div className={classNames(cls.ArticleList, {}, [className, cls[views]])}>
                <Text title={t('Статьи не найдены!')} size={TextSize.L} />
            </div>
        );
    }
    return (
        <ToggleFeatures
            name="isNewDesignEnabled"
            on={
                <HStack
                    wrap="wrap"
                    gap={16}
                    data-testid="ArticleListRedesign"
                    className={classNames(cls.ArticleList, {}, [])}
                >
                    {articles.map((item) => (
                        <ArticleListItem
                            article={item}
                            view={views}
                            key={item?.id}
                            className={cls.card}
                            target={target}
                        />
                    ))}
                    {isLoading && getSceletons(views)}
                </HStack>
            }
            off={
                <div data-testid="ArticleList" className={classNames(cls.ArticleList, {}, [className, cls[views]])}>
                    {articles.map((item) => (
                        <ArticleListItem
                            article={item}
                            view={views}
                            key={item?.id}
                            className={cls.card}
                            target={target}
                        />
                    ))}
                    {isLoading && getSceletons(views)}
                </div>
            }
        />
    );
});
