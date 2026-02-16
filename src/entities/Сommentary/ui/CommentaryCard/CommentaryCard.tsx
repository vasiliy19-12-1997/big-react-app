import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Avatar as AvatarDeprecated } from '@/shared/ui/deprecated/Avatar';
import { Text as TextDeprecated } from '@/shared/ui/deprecated/Text';
import { Sceleton as SceletonDeprecated } from '@/shared/ui/deprecated/Sceleton';
import { AppLink as AppLinkDeprecated } from '@/shared/ui/deprecated/AppLink';
import { Commentary } from '../../model/types/commentary';
import cls from './CommentaryCard.module.scss';
import { getRouteProfile } from '@/shared/const/router';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { ToggleFeatures } from '@/shared/features';
import { Sceleton } from '@/shared/ui/redesigned/Sceleton';
import { Card } from '@/shared/ui/redesigned/Card';
import { AppLink } from '@/shared/ui/redesigned/AppLink';
import { Avatar } from '@/shared/ui/redesigned/Avatar';
import { Text } from '@/shared/ui/redesigned/Text';

export interface CommentaryCardProps {
    className?: string;
    comment?: Commentary;
    isLoading: boolean;
}

export const CommentaryCard = memo((props: CommentaryCardProps) => {
    const { t } = useTranslation();
    const { className, comment, isLoading } = props;

    if (!comment) {
        return null;
    }
    if (isLoading) {
        return (
            <VStack gap={8} max className={classNames(cls.CommentaryList, {}, [className, cls.loading])}>
                <ToggleFeatures
                    name="isNewDesignEnabled"
                    on={
                        <>
                            <div className={cls.wrapperAvatar}>
                                <Sceleton className={cls.avatar} width={30} height={30} border="50%" />
                                <Sceleton width={150} height={16} />
                            </div>
                            <Sceleton height={50} />
                        </>
                    }
                    off={
                        <>
                            <div className={cls.wrapperAvatar}>
                                <SceletonDeprecated className={cls.avatar} width={30} height={30} border="50%" />
                                <SceletonDeprecated width={150} height={16} />
                            </div>
                            <SceletonDeprecated height={50} />
                        </>
                    }
                />
            </VStack>
        );
    }
    return (
        <ToggleFeatures
            name="isNewDesignEnabled"
            on={
                <Card padding="24" border="round" max>
                    <VStack
                        data-testid="CommentaryCard.Content"
                        gap={8}
                        max
                        className={classNames(cls.CommentaryCardRedesign, {}, [className])}
                    >
                        <AppLink to={getRouteProfile(comment?.user?.id)} className={cls.wrapperAvatar}>
                            <HStack gap={8}>
                                {comment?.user?.avatar && (
                                    <Avatar className={cls.avatar} size={30} src={comment?.user?.avatar} />
                                )}
                                <Text text={comment?.user?.username} bold />
                            </HStack>
                        </AppLink>
                        <Text data-testid="CommentaryCard.Text" text={comment?.text} />
                    </VStack>
                </Card>
            }
            off={
                <VStack
                    data-testid="CommentaryCard.Content"
                    gap={8}
                    max
                    className={classNames(cls.CommentaryCard, {}, [className])}
                >
                    <AppLinkDeprecated to={getRouteProfile(comment?.user?.id)} className={cls.wrapperAvatar}>
                        {comment?.user?.avatar && (
                            <AvatarDeprecated className={cls.avatar} size={30} src={comment?.user?.avatar} />
                        )}
                        <TextDeprecated title={comment?.user?.username} />
                    </AppLinkDeprecated>
                    <TextDeprecated data-testid="CommentaryCard.Text" text={comment?.text} />
                </VStack>
            }
        />
    );
});
