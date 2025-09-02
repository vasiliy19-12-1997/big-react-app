import { classNames } from 'shared/lib/classNames/classNames';
import { HTMLAttributeAnchorTarget, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Text, TextSize } from 'shared/ui/Text/Text';
import { AutoSizer, List } from 'react-virtualized';
import cls from './ArticleList.module.scss';
import { Article, ArticleViews } from '../../model/types/artcile';
import { ArticleListItem } from '../ArticleListItem/ArticleListItem';
import { ArticleListItemSceleton } from '../ArticleListItem/ArticleListItemSceleton';

interface ArticleListProps {
  className?: string;
  isLoading?:boolean
  articles:Article[]
  views?:ArticleViews
  target?:HTMLAttributeAnchorTarget
}

export const ArticleList = memo((props: ArticleListProps) => {
    const { t } = useTranslation();
    const {
        className, articles, views = ArticleViews.SMALL, isLoading, target,
    } = props;
    const getSceletons = () => new Array(views === ArticleViews.SMALL ? 9 : 3).fill(0).map((item, index) => (
        <ArticleListItemSceleton view={views} key={String(index)} />
    ));
    const renderArticle = (article:Article) => (
        <ArticleListItem
            key={article?.id}
            className={cls.card}
            article={article}
            view={views}
            target={target}
        />
    );
    if (!isLoading && !articles.length) {
        return (
            <div className={classNames(cls.ArticleList, {}, [className, cls[views]])}>
                <Text title={t('Статьи не найдены!')} size={TextSize.L} />
            </div>
        );
    }
    return (
        <AutoSizer disableHeight>
            {({ width, height }) => (
                <List
                    height={500}
                    rowCount={articles.length}
                    rowHeight={500}
                    // eslint-disable-next-line react/no-unstable-nested-components
                    rowRenderer={() => <div />}
                    width={width}
                />
            )}
        </AutoSizer>

    // <div className={classNames(cls.ArticleList, {}, [className, cls[views]])}>
    //     {articles?.length > 0 ? articles.map(renderArticle) : null}
    //     {isLoading && (
    //         <div className={classNames(cls.ArticleList, {}, [className, cls[views]])}>
    //             {getSceletons()}
    //         </div>
    //     )}
    // </div>
    );
});
