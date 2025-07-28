import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Commentary } from 'entities/Сommentary/model/types/commentary';
import { Avatar } from 'shared/ui/Avatar/Avatar';
import { Text } from 'shared/ui/Text/Text';
import cls from './CommentaryCard.module.scss';

interface CommentaryCardProps {
  className?: string;
  comment:Commentary
}

export const CommentaryCard = memo((props: CommentaryCardProps) => {
    const { t } = useTranslation();
    const { className, comment } = props;

    return (
        <div className={classNames(cls.CommentaryCard, {}, [className])}>
            <div>
                {comment.user.avatar && <Avatar size={30} src={comment.user.avatar} />}
                <Text title={comment.user.username} />
            </div>
            <Text text={comment.text} />
        </div>
    );
});
