import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Avatar } from '@/shared/ui/deprecated/Avatar';
import { Text } from '@/shared/ui/deprecated/Text';
import { Sceleton } from '@/shared/ui/deprecated/Sceleton';
import { AppLink } from '@/shared/ui/deprecated/AppLink';
import { Commentary } from '../../model/types/commentary';
import cls from './CommentaryCard.module.scss';
import { getRouteProfile } from '@/shared/const/router';
import { VStack } from '@/shared/ui/redesigned/Stack';

interface CommentaryCardProps {
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
                <div className={cls.wrapperAvatar}>
                    <Sceleton className={cls.avatar} width={30} height={30} border="50%" />
                    <Sceleton width={150} height={16} />
                </div>
                <Sceleton height={50} />
            </VStack>
        );
    }
    return (
        <VStack
            data-testid="CommentaryCard.Content"
            gap={8}
            max
            className={classNames(cls.CommentaryCard, {}, [className])}
        >
            <AppLink to={getRouteProfile(comment?.user?.id)} className={cls.wrapperAvatar}>
                {comment?.user?.avatar && <Avatar className={cls.avatar} size={30} src={comment?.user?.avatar} />}
                <Text title={comment?.user?.username} />
            </AppLink>
            <Text data-testid="CommentaryCard.Text" text={comment?.text} />
        </VStack>
    );
});
