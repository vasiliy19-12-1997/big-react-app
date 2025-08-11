import { classNames } from 'shared/lib/classNames/classNames';
import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import {
    ArtcileBlockText, Article, ArticleBlockType, ArticleViews,
} from 'entities/Article/model/types/artcile';
import { Text } from 'shared/ui/Text/Text';
import EyeIcon from 'shared/assets/icons/eye-20-20.svg';
import { Card } from 'shared/ui/Card/Card';
import { useHover } from 'shared/lib/hooks/useHover/useHover';
import { Avatar } from 'shared/ui/Avatar/Avatar';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { useNavigate } from 'react-router-dom';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { ArtcileTextBlockComponent } from '../ArtcileTextBlockComponent/ArtcileTextBlockComponent';
import cls from './ArticleListItem.module.scss';

interface ArticleListItemProps {
  className?: string;
  article:Article
  view:ArticleViews
}

export const ArticleListItem = memo((props: ArticleListItemProps) => {
    const { t } = useTranslation();
    const { className, article, view } = props;
    const [isHover, bindHover] = useHover();
    const navigate = useNavigate();
    const types = <Text text={article.type.join(',')} className={cls.type} />;
    const img = (<img src={article.img} alt={article.title} className={cls.img} />);
    const views = (
        <>
            <Text text={String(article.views)} className={cls.views} />
            <EyeIcon className={cls.eyeIcon} />
        </>
    );
    const textBlock = article.blocks.find((block) => block.type === ArticleBlockType.TEXT) as ArtcileBlockText;

    const onOpenArticle = useCallback(() => {
        navigate(`${RoutePath.articles}/${article.id}`);
    }, [article.id, navigate]);
    if (view === ArticleViews.BIG) {
        return (
            <div className={classNames(cls.ArticleListItem, {}, [className, cls[view]])}>
                <div className={cls.header}>
                    <Avatar size={50} alt={article.title} src={article.user.avatar} className={cls.avatar} />
                    <Text text={article.user.username} className={cls.username} />
                    <Text text={article.createdAt} className={cls.createdAt} />
                </div>
                <Text title={article.title} className={cls.title} />
                {types}
                {img}
                <ArtcileTextBlockComponent block={textBlock} className={cls.textBlock} />
                <div className={cls.footer}>
                    <Button onClick={onOpenArticle} theme={ButtonTheme.OUTLINE} className={cls.footerBtn}>
                        {t('Читать далее..')}
                    </Button>
                    {views}
                </div>
            </div>
        );
    }
    return (
    // @ts-ignore
        <div {...bindHover} className={classNames(cls.ArticleListItem, {}, [className, cls[view]])}>
            <Card onClick={onOpenArticle}>
                <div className={cls.imageWrapper}>
                    <img src={article.img} alt={article.title} className={cls.img} />
                    <Text text={article.createdAt} className={cls.date} />
                </div>
                <div className={cls.textWrapper}>
                    {types}
                    {views}
                </div>
                <Text title={article.title} className={cls.title} />
            </Card>
        </div>
    );
});
