import { classNames } from 'shared/lib/classNames/classNames';
import { HTMLAttributeAnchorTarget, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Text, TextSize } from 'shared/ui/Text/Text';
import {
    AutoSizer, List, ListRowProps, WindowScroller,
} from 'react-virtualized';
import { PAGE_ID } from 'widgets/Page/Page';
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

    const rowRenderer = ({
        index, isScrolling, key, style,
    }:ListRowProps) => {
        console.log('render');
        return (
            <div
                key={key}
                style={style}
            >
                <ArticleListItem
                    className={cls.card}
                    article={articles[index]}
                    view={views}
                    target={target}
                />
            </div>
        );
    };

    if (!isLoading && !articles.length) {
        return (
            <div className={classNames(cls.ArticleList, {}, [className, cls[views]])}>
                <Text title={t('Статьи не найдены!')} size={TextSize.L} />
            </div>
        );
    }
    return (
        <WindowScroller
            scrollElement={document.getElementById(PAGE_ID) as Element}
        >
            {({ height, width }) => (

                <div className={classNames(cls.ArticleList, {}, [className, cls[views]])}>
                    <List
                        height={height}
                        width={width}
                        rowHeight={500}
                        rowCount={articles.length}
                        // eslint-disable-next-line react/no-unstable-nested-components, i18next/no-literal-string
                        rowRenderer={rowRenderer}
                    />
                    {isLoading && getSceletons()}

                </div>
            )}
        </WindowScroller>
    );
});
