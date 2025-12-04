import { HTMLAttributeAnchorTarget, memo } from 'react';
import { useTranslation } from 'react-i18next';
import EyeIcon from '@/shared/assets/icons/eye-20-20.svg';
import { RoutePath } from '@/shared/const/router';
import { classNames } from '@/shared/lib/classNames/classNames';
import { useHover } from '@/shared/lib/hooks/useHover/useHover';
import { AppLink } from '@/shared/ui/AppLink';
import { Avatar } from '@/shared/ui/Avatar';
import { Button, ButtonTheme } from '@/shared/ui/Button';
import { Card } from '@/shared/ui/Card';
import { Text } from '@/shared/ui/Text';
import {
    ArtcileBlockText, Article, ArticleBlockType, ArticleViews,
} from '../../model/types/artcile';
import { ArtcileTextBlockComponent } from '../ArtcileTextBlockComponent/ArtcileTextBlockComponent';
import cls from './ArticleListItem.module.scss';

interface ArticleListItemProps {
  className?: string;
  article:Article
  view:ArticleViews
  target?:HTMLAttributeAnchorTarget
}

export const ArticleListItem = memo((props: ArticleListItemProps) => {
    const { t } = useTranslation();
    const {
        className, article, view, target,
    } = props;
    const [isHover, bindHover] = useHover();
    const types = <Text text={article?.type.join(',')} className={cls.type} />;
    const img = (<img src={article?.img} alt={article?.title} className={cls.img} />);
    const views = (
        <>
            <Text text={String(article?.views)} className={cls.views} />
            <EyeIcon className={cls.eyeIcon} />
        </>
    );
    const textBlock = article?.blocks.find((block) => block.type === ArticleBlockType.TEXT) as ArtcileBlockText;
    if (view === ArticleViews.BIG) {
        return (
            <div className={classNames(cls.ArticleListItem, {}, [className, cls[view]])}>
                <div className={cls.header}>
                    <Avatar size={50} alt={article?.title} src={article?.user?.avatar} className={cls.avatar} />
                    <Text text={article?.user?.username} className={cls.username} />
                    <Text text={article?.createdAt} className={cls.createdAt} />
                </div>
                <Text title={article?.title} className={cls.title} />
                {types}
                {img}
                <ArtcileTextBlockComponent block={textBlock} className={cls.textBlock} />
                <div className={cls.footer}>
                    <AppLink target={target} to={`${RoutePath.articles}/${article?.id}`}>
                        <Button theme={ButtonTheme.OUTLINE} className={cls.footerBtn}>
                            {t('Читать далее..')}
                        </Button>
                    </AppLink>

                    {views}
                </div>
            </div>
        );
    }

    return (
    // @ts-ignore
        <div {...bindHover} className={classNames(cls.ArticleListItem, {}, [className, cls[view]])}>
            <AppLink target={target} to={`${RoutePath.articles}/${article?.id}`}>
                <Card>
                    <div className={cls.imageWrapper}>
                        {img}
                        <Text text={article?.createdAt} className={cls.date} />
                    </div>
                    <div className={cls.textWrapper}>
                        {types}
                        {views}
                    </div>
                    <Text title={article?.title} className={cls.title} />
                </Card>
            </AppLink>
        </div>
    );
});
