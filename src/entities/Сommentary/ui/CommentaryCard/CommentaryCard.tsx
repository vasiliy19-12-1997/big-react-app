import { classNames } from '@/shared/lib/classNames/classNames';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Avatar } from '@/shared/ui/Avatar/Avatar';
import { Text } from '@/shared/ui/Text/Text';
import { Sceleton } from '@/shared/ui/Sceleton/Sceleton';
import { AppLink } from '@/shared/ui/AppLink/AppLink';
import { RoutePath } from '@/shared/config/routeConfig/routeConfig';
import { VStack } from '@/shared/ui/Stack';
import { Commentary } from '../../model/types/commentary';
import cls from './CommentaryCard.module.scss';

interface CommentaryCardProps {
  className?: string;
  comment?:Commentary;
  isLoading:boolean
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
        <VStack gap={8} max className={classNames(cls.CommentaryCard, {}, [className])}>
            <AppLink to={`${RoutePath.profile}${comment?.user?.id}`} className={cls.wrapperAvatar}>
                {comment?.user?.avatar && <Avatar className={cls.avatar} size={30} src={comment?.user?.avatar} />}
                <Text title={comment?.user?.username} />
            </AppLink>
            <Text text={comment?.text} />
        </VStack>
    );
});
