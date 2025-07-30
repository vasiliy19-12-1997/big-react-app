import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Commentary } from 'entities/Сommentary/model/types/commentary';
import { Avatar } from 'shared/ui/Avatar/Avatar';
import { Text } from 'shared/ui/Text/Text';
import { Sceleton } from 'shared/ui/Sceleton/Sceleton';
import cls from './CommentaryCard.module.scss';

interface CommentaryCardProps {
  className?: string;
  comment:Commentary;
  IsLoading:boolean
}

export const CommentaryCard = memo((props: CommentaryCardProps) => {
    const { t } = useTranslation();
    const { className, comment, IsLoading } = props;
    if (IsLoading) {
        return (
            <div className={classNames(cls.CommentaryList, {}, [className])}>
                <div className={cls.wrapperAvatar}>
                    <Sceleton className={cls.avatar} width={30} height={30} border="50%" />
                    <Sceleton width={150} height={16} />
                </div>
                <Sceleton height={50} />

            </div>
        );
    }
    return (
        <div className={classNames(cls.CommentaryCard, {}, [className])}>
            <div className={cls.wrapperAvatar}>
                {comment?.user?.avatar && <Avatar className={cls.avatar} size={30} src={comment?.user?.avatar} />}
                <Text title={comment?.user?.username} />
            </div>
            <Text text={comment?.text} />
        </div>
    );
});
