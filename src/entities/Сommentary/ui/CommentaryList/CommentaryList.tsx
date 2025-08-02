import { Commentary } from 'entities/Сommentary/model/types/commentary';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { CommentaryCard } from '../CommentaryCard/CommentaryCard';
import cls from './CommentaryList.module.scss';

interface CommentaryListProps {
  className?: string;
  comments:Commentary[];
  isLoading:boolean;
}

export const CommentaryList = memo((props: CommentaryListProps) => {
    const { t } = useTranslation();
    const { className, comments, isLoading } = props;

    if (isLoading) {
        return (
            <div className={classNames(cls.CommentaryList, {}, [className])}>
                <CommentaryCard isLoading />
                <CommentaryCard isLoading />
                <CommentaryCard isLoading />
            </div>
        );
    }

    return (
        <div className={classNames(cls.CommentaryList, {}, [className])}>
            {comments.length > 0 ? comments.map((comment, index) => (
                // eslint-disable-next-line react/no-array-index-key
                <CommentaryCard key={index} isLoading={isLoading} className={cls.cards} comment={comment} />
            )) : (
                null
            )}
        </div>
    );
});
