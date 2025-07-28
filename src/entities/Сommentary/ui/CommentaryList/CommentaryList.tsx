import { Commentary } from 'entities/Сommentary/model/types/commentary';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { CommentaryCard } from '../CommentaryCard/CommentaryCard';
import cls from './CommentaryList.module.scss';

interface CommentaryListProps {
  className?: string;
  comments:Commentary[];

}

export const CommentaryList = memo((props: CommentaryListProps) => {
    const { t } = useTranslation();
    const { className, comments } = props;

    return (
        <div className={classNames(cls.CommentaryList, {}, [className])}>
            {comments.length > 0 ? comments.map((comment) => (
                <CommentaryCard className={cls.cards} comment={comment} />
            )) : (
                null
            )}
        </div>
    );
});
