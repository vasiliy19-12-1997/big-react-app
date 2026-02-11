import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { Commentary } from '../../model/types/commentary';
import { CommentaryCard } from '../CommentaryCard/CommentaryCard';
import cls from './CommentaryList.module.scss';
import { Text as TextDeprecated } from '@/shared/ui/deprecated/Text';
import { ToggleFeatures } from '@/shared/features';
import { Text } from '@/shared/ui/redesigned/Text';

interface CommentaryListProps {
    className?: string;
    comments: Commentary[];
    isLoading: boolean;
}

export const CommentaryList = memo((props: CommentaryListProps) => {
    const { t } = useTranslation();
    const { className, comments, isLoading } = props;

    if (isLoading) {
        return (
            <VStack gap={16} max className={classNames('', {}, [className])}>
                <CommentaryCard isLoading />
                <CommentaryCard isLoading />
                <CommentaryCard isLoading />
            </VStack>
        );
    }

    return (
        <VStack gap={16} max className={classNames('', {}, [className])}>
            {comments.length > 0 ? (
                comments.map((comment, index) => (
                    // eslint-disable-next-line react/no-array-index-key
                    <CommentaryCard key={index} isLoading={isLoading} className={cls.cards} comment={comment} />
                ))
            ) : (
                <ToggleFeatures
                    name="isNewDesignEnabled"
                    on={<Text title={t('Комментарии отсутствуют')} />}
                    off={<TextDeprecated title={t('Комментарии отсутствуют')} />}
                />
            )}
        </VStack>
    );
});
