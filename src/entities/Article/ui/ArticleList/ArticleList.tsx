import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import cls from './ArticleList.module.scss';
import { Article, ArticleViews } from '../../model/types/artcile';
import { ArticleListItem } from '../ArticleListItem/ArticleListItem';

interface ArticleListProps {
  className?: string;
  isLoading?:boolean
  articles:Article[]
  views?:ArticleViews
}


export const ArticleList = memo((props: ArticleListProps) => {
    const { t } = useTranslation();
    const {
        className, articles, views = ArticleViews.SMALL, isLoading,
    } = props;
    const renderArticle = (article:Article)=>{
         return ( <ArticleListItem article = {article} view = {views}/>)
     }
    return (
        <div className={classNames(cls.ArticleList, {}, [className])} >
           {articles.length > 0 ? articles.map(renderArticle) : null}
        </div>
    );
});
