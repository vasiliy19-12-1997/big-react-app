import { classNames } from "shared/lib/classNames/classNames";
import cls from "./ArticleListItem.module.scss";
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Article, ArticleViews } from "entities/Article/model/types/artcile";
import { Text } from "shared/ui/Text/Text";
import EyeIcon from "shared/assets/icons/eye-20-20.svg"
interface ArticleListItemProps {
  className?: string;
  article:Article
  view:ArticleViews
}

export const ArticleListItem = memo((props: ArticleListItemProps) => {
  const { t } = useTranslation();
  const { className, article, view } = props;

  if(view === ArticleViews.BIG){
    return (
        <div className={classNames(cls.ArticleListItem, {}, [className, cls[view]])}>
        {article.title}
      </div>
    )
  }
    return (
      <div className={classNames(cls.ArticleListItem, {}, [className, cls[view]])}>
        <div className={cls.card}>
          <div className={cls.imageWrapper}>
            <img src={article.img} alt={article.title} className={cls.img} />
            <Text text={article.createdAt} className={cls.date}/>
          </div>
          <div className={cls.textWrapper}>
            <Text text={article.subtitle} className={cls.subtitle} />
            <Text text={String(article.views)} className={cls.views}/>
            <EyeIcon className={cls.eyeIcon}/>
           </div>
          <Text title={article.title} className={cls.title}/>
        </div>
      </div>
  )
});
