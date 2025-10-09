import { HTMLAttributeAnchorTarget, memo } from 'react';
import { useTranslation } from 'react-i18next';
import {
    AutoSizer, List, ListRowProps, WindowScroller,
} from 'react-virtualized';
import { Text, TextSize } from '@/shared/ui/Text/Text';
import { classNames } from '@/shared/lib/classNames/classNames';
import { PAGE_ID } from '@/widgets/Page/Page';
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
    const isBig = views === ArticleViews.BIG;
    const itemsPerRow = isBig ? 1 : 3;
    const rowCount = isBig ? articles.length : Math.ceil(articles.length / itemsPerRow);
    const rowRenderer = ({
        index,
        isScrolling,
        key,
        style,
    }:ListRowProps) => {
        const items = [];
        const fromIndex = index * itemsPerRow;
        const toIndex = Math.min(fromIndex + itemsPerRow, articles.length);
        for (let i = fromIndex; i < toIndex; i += 1) {
            items.push(
                <ArticleListItem
                    article={articles[i]}
                    className={cls.card}
                    view={views}
                    target={target}
                    key={`str${i}`}
                />,
            );
        }
        console.log('render');

        return (
            <div
                className={cls.row}
                key={key}
                style={style}
            >
                {items}
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
            scrollElement={document.getElementById(PAGE_ID) as Element ?? window}
        >
            {({
                registerChild,
                isScrolling,
                onChildScroll,
                scrollTop,
            }) => (

                <div ref={registerChild} className={classNames(cls.ArticleList, {}, [className, cls[views]])}>
                    {virtualized ? (
                        <AutoSizer disableHeight>
                            {({ width, height }) => (
                                <List
                                    height={height ?? 500}
                                    rowCount={rowCount}
                                    rowHeight={isBig ? 700 : 300}
                                    width={width ? width - 80 : 700}
                                    rowRenderer={rowRenderer}
                                    autoHeight
                                    onScroll={onChildScroll}
                                    isScrolling={isScrolling}
                                    scrollTop={scrollTop}
                                />
                            )}
                        </AutoSizer>
                    ) : (
                        articles.map((item) => (
                            <ArticleListItem
                                article={item}
                                view={views}
                                key={item.id}
                                className={cls.card}
                                target={target}
                            />
                        ))
                    )}
                    {isLoading && getSceletons(views)}
                </div>
            )}

        </WindowScroller>
    );
});
