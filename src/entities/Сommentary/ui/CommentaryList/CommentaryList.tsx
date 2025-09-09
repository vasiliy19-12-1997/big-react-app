import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { HStack, VStack } from 'shared/ui';
import { Commentary } from '../../model/types/commentary';
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
            <VStack className={classNames('', {}, [className])}>
                <CommentaryCard isLoading />
                <CommentaryCard isLoading />
                <CommentaryCard isLoading />
            </VStack>
        );
    }

    return (
        <VStack max className={classNames('', {}, [className])}>
            {comments.length > 0 ? comments.map((comment, index) => (
                // eslint-disable-next-line react/no-array-index-key
                <CommentaryCard key={index} isLoading={isLoading} className={cls.cards} comment={comment} />
            )) : (
                null
            )}
        </VStack>
    );
});
