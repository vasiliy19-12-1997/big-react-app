import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { User } from '@/entities/User';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Avatar } from '@/shared/ui/redesigned/Avatar';
import { Button } from '@/shared/ui/redesigned/Button';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';
import cls from './ArticlesAdditionalInfo.module.scss';

interface ArticlesAdditionalInfoProps {
    className?: string;
    author: User;
    createdAt: string;
    views: number;
    onEdit: () => void;
}

export const ArticlesAdditionalInfo = memo((props: ArticlesAdditionalInfoProps) => {
    const { t } = useTranslation();
    const { className, author, createdAt, views, onEdit } = props;

    return (
        <VStack gap={32} className={classNames(cls.ArticlesAdditionalInfo, {}, [className])}>
            <HStack>
                <Avatar src={author?.avatar} />
                <Text text={author?.username} bold />
                <Text text={createdAt} />
            </HStack>
            <VStack gap={32}>
                <Button onClick={onEdit}>{t('Редактировать')}</Button>
                <Text text={t('{{count}} просмотров', { count: views })} />
            </VStack>
        </VStack>
    );
});
