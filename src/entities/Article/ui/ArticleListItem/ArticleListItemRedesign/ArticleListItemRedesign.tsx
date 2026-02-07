import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import EyeIcon from '@/shared/assets/icons/eye.svg';
import { getRouteArticleDetails } from '@/shared/const/router';
import { classNames } from '@/shared/lib/classNames/classNames';
import { AppImage } from '@/shared/ui/redesigned/AppImage';
import { AppLink } from '@/shared/ui/redesigned/AppLink';
import { Avatar } from '@/shared/ui/redesigned/Avatar';
import { Button } from '@/shared/ui/redesigned/Button';
import { Card } from '@/shared/ui/redesigned/Card';
import { Sceleton } from '@/shared/ui/redesigned/Sceleton';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';
import { ArtcileBlockText, ArticleBlockType, ArticleView } from '../../../model/types/artcile';
import { ArticleListItemProps } from '../ArticleListItem';
import cls from './ArticleListItemRedesign.module.scss';

export const ArticleListItemRedesign = memo((props: ArticleListItemProps) => {
    const { t } = useTranslation();
    const { className, article, view, target } = props;

    const userInfo = (
        <>
            <Avatar size={32} src={article?.user?.avatar} />
            <Text bold text={article?.user?.username} />
        </>
    );

    const views = (
        <HStack gap={8}>
            <EyeIcon className={cls.eyeIcon} />
            <Text text={String(article?.views)} className={cls.views} />
        </HStack>
    );

    if (view === ArticleView.BIG) {
        const textBlock = article?.blocks?.find((block) => block?.type === ArticleBlockType.TEXT) as ArtcileBlockText;
        return (
            <Card
                padding="24"
                max
                data-testid="ArticleListItem"
                className={classNames(cls.ArticleListItem, {}, [className, cls[view]])}
            >
                <VStack max gap={16}>
                    <HStack gap={8} max>
                        {userInfo}
                        <Text text={article?.createdAt} />
                    </HStack>
                    <Text title={article?.title} bold />
                    <Text title={article?.subtitle} size="s" />
                    <AppImage
                        fallback={<Sceleton width="100%" height={250} />}
                        src={article?.img}
                        className={cls.img}
                        alt={article?.title}
                    />
                    {textBlock?.paragraphs && (
                        <Text className={cls.textBlock} text={textBlock.paragraphs.slice(0, 2).join(' ')} />
                    )}
                    <HStack max justify="between">
                        <AppLink target={target} to={getRouteArticleDetails(article.id)}>
                            <Button variant="outline">{t('Читать далее..')}</Button>
                        </AppLink>
                        {views}
                    </HStack>
                </VStack>
            </Card>
        );
    }

    return (
        <AppLink
            data-testid="ArticleListItem"
            target={target}
            to={getRouteArticleDetails(article?.id)}
            className={classNames(cls.ArticleListItem, {}, [className, cls[view]])}
        >
            <Card className={cls.card} border="round">
                <AppImage
                    fallback={<Sceleton width={200} height={200} />}
                    alt={article?.title}
                    src={article?.img}
                    className={cls.img}
                />
                <VStack className={cls.info} gap={4}>
                    <Text title={article?.title} className={cls.title} />
                    <VStack gap={4} className={cls.footer} max>
                        <HStack justify="between" max>
                            <Text text={article?.createdAt} className={cls.date} />
                            {views}
                        </HStack>
                        <HStack gap={4}>{userInfo}</HStack>
                    </VStack>
                </VStack>
            </Card>
        </AppLink>
    );
});
