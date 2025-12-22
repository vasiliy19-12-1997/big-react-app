import { classNames } from '@/shared/lib/classNames/classNames';
import { Text, TextSize } from '@/shared/ui/Text';
import { HTMLAttributeAnchorTarget, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Article, ArticleViews } from '../../model/types/artcile';
import { ArticleListItem } from '../ArticleListItem/ArticleListItem';
import { ArticleListItemSceleton } from '../ArticleListItem/ArticleListItemSceleton';
import cls from './ArticleList.module.scss';

interface ArticleListProps {
  className?: string;
  isLoading?:boolean
  articles:Article[]
  views?:ArticleViews
  target?:HTMLAttributeAnchorTarget
  virtualized?:boolean
}

export const ArticleList = memo((props: ArticleListProps) => {
    const { t } = useTranslation();
    const {
        className, articles,
        views = ArticleViews.SMALL,
        isLoading,
        target,
        virtualized = true,
    } = props;
    const getSceletons = (view:ArticleViews) => new Array(view === ArticleViews.SMALL ? 9 : 3).fill(0).map((item, index) => (
        <ArticleListItemSceleton view={view} key={String(index)} />
    ));

    if (!isLoading && !articles.length) {
        return (
            <div className={classNames(cls.ArticleList, {}, [className, cls[views]])}>
                <Text title={t('Статьи не найдены!')} size={TextSize.L} />
            </div>
        );
    }
    return (

        <div data-testid="ArticleList" className={classNames(cls.ArticleList, {}, [className, cls[views]])}>
            {
                articles.map((item) => (
                    <ArticleListItem
                        article={item}
                        view={views}
                        key={item?.id}
                        className={cls.card}
                        target={target}
                    />
                ))
            }
            {isLoading && getSceletons(views)}
        </div>

    );
});
