import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import EyeIcon from '@/shared/assets/icons/eye.svg';
import { getRouteArticleDetails } from '@/shared/const/router';
import { classNames } from '@/shared/lib/classNames/classNames';
import { useHover } from '@/shared/lib/hooks/useHover/useHover';
import { AppLink } from '@/shared/ui/redesigned/AppLink';
import { Avatar } from '@/shared/ui/redesigned/Avatar';
import { Button } from '@/shared/ui/redesigned/Button';
import { Card } from '@/shared/ui/redesigned/Card';
import { Sceleton } from '@/shared/ui/redesigned/Sceleton';
import { Text } from '@/shared/ui/redesigned/Text';
import { AppImage } from '@/shared/ui/redesigned/AppImage';
import { ArtcileBlockText, ArticleBlockType, ArticleViews } from '../../../model/types/artcile';
import { ArtcileTextBlockComponent } from '../../ArtcileTextBlockComponent/ArtcileTextBlockComponent';
import { ArticleListItemProps } from '../ArticleListItem';
import cls from './ArticleListItemRedesign.module.scss';
import { HStack } from '@/shared/ui/redesigned/Stack';

export const ArticleListItemRedesign = memo((props: ArticleListItemProps) => {
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
        <HStack gap={8}>
            <EyeIcon className={cls.eyeIcon} />
            <Text text={String(article?.views)} className={cls.views} />
        </HStack>
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
                        <Button variant="outline" className={cls.footerBtn}>
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
