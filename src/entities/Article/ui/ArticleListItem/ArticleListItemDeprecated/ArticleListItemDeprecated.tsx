import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import EyeIcon from '@/shared/assets/icons/eye-20-20.svg';
import { getRouteArticleDetails } from '@/shared/const/router';
import { classNames } from '@/shared/lib/classNames/classNames';
import { useHover } from '@/shared/lib/hooks/useHover/useHover';
import { AppLink } from '@/shared/ui/deprecated/AppLink';
import { Avatar } from '@/shared/ui/deprecated/Avatar';
import { Button, ButtonTheme } from '@/shared/ui/deprecated/Button';
import { Card } from '@/shared/ui/deprecated/Card';
import { Sceleton } from '@/shared/ui/deprecated/Sceleton';
import { Text } from '@/shared/ui/deprecated/Text';
import { AppImage } from '@/shared/ui/redesigned/AppImage';
import { ArtcileBlockText, ArticleBlockType, ArticleViews } from '../../../model/types/artcile';
import { ArtcileTextBlockComponent } from '../../ArtcileTextBlockComponent/ArtcileTextBlockComponent';
import { ArticleListItemProps } from '../ArticleListItem';
import cls from './ArticleListItemDeprecated.module.scss';

export const ArticleListItemDeprecated = memo((props: ArticleListItemProps) => {
    const { t } = useTranslation();
    const { className, article, view, target } = props;
    const [isHover, bindHover] = useHover();
    const types = <Text text={Array.isArray(article?.type) ? article.type.join(', ') : ''} className={cls.type} />;
    const img = (
        <AppImage
            src={article?.img}
            alt={article?.title}
            className={cls.img}
            fallback={<Sceleton width={200} height={200} />}
            errorFallback={<Sceleton width={200} height={200} />}
        />
    );
    const views = (
        <>
            <Text text={String(article?.views)} className={cls.views} />
            <EyeIcon className={cls.eyeIcon} />
        </>
    );
    const textBlock = article?.blocks?.find((block) => block.type === ArticleBlockType.TEXT) as ArtcileBlockText;
    if (view === ArticleViews.BIG) {
        return (
            <div data-testid="ArticleListItem" className={classNames(cls.ArticleListItem, {}, [className, cls[view]])}>
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
                    <AppLink target={target} to={getRouteArticleDetails(article?.id)}>
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
        <div
            data-testid="ArticleListItem"
            // @ts-ignore
            {...bindHover}
            className={classNames(cls.ArticleListItem, {}, [className, cls[view]])}
        >
            <AppLink target={target} to={getRouteArticleDetails(article?.id)}>
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
