import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import cls from './ArticleList.module.scss';
import { Article, ArticleViews } from '../../model/types/artcile';
import { ArticleListItem } from '../ArticleListItem/ArticleListItem';
import { ArticleListItemSceleton } from '../ArticleListItem/ArticleListItemSceleton';

interface ArticleListProps {
  className?: string;
  isLoading?:boolean
  articles:Article[]
  views?:ArticleViews
}

export const ArticleList = memo((props: ArticleListProps) => {
    const { t } = useTranslation();
    const {
        className, articles, views = ArticleViews.BIG, isLoading,
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
        />
    );

    return (
        <div className={classNames(cls.ArticleList, {}, [className, cls[views]])}>
            {articles?.length > 0 ? articles.map(renderArticle) : null}
            {isLoading && (
                <div className={classNames(cls.ArticleList, {}, [className, cls[views]])}>
                    {getSceletons()}
                </div>
            )}
        </div>
    );
});
