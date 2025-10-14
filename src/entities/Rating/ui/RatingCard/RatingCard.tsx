import { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './RatingCard.module.scss';
import { Card } from '@/shared/ui/Card/Card';
import { VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text/Text';
import { StarRating } from '@/shared/ui/StarRating/StarRating';
import { Modal } from '@/shared/ui/Modal/Modal';
import { Input } from '@/shared/ui/Input/Input';
import { Button, ButtonTheme } from '@/shared/ui/Button/Button';

interface RatingCardProps {
  className?: string;
  title?:string;
  feedbackTitle?:string;
  hasFeedback?:boolean;
  onAccept?:(starsCount:number, feedback:string)=>void;
  onCancel?:(starsCount:number)=>void
}

export const RatingCard = memo((props: RatingCardProps) => {
    const { t } = useTranslation();
    const {
        className, title, feedbackTitle, hasFeedback, onAccept, onCancel,
    } = props;
    const [modalOpen, setModalOpen] = useState(false);

    const onSelectedStars = useCallback(() => {
        setModalOpen(true);
    }, []);
    const onCloseModal = useCallback(() => {
        setModalOpen(false);
    }, []);
    return (
        <Card className={classNames(cls.RatingCard, {}, [className])}>
            <VStack gap={32} max>
                <Text title={title} />
                <StarRating onSelect={onSelectedStars} />
            </VStack>
            <Modal isOpen={modalOpen} lazy onClose={onCloseModal}>
                <VStack gap={16} max>
                    <Text />
                    <Input />
                    <Button>{t('Отправить')}</Button>
                    <Button onClick={onCloseModal} theme={ButtonTheme.OUTLINE_RED}>{t('Закрыть')}</Button>
                </VStack>
            </Modal>
        </Card>
    );
});
