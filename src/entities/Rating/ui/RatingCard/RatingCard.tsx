import { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BrowserView, MobileView } from 'react-device-detect';
import cls from './RatingCard.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Card } from '@/shared/ui/deprecated/Card';
import { Text } from '@/shared/ui/deprecated/Text';
import { StarRating } from '@/shared/ui/deprecated/StarRating';
import { Modal } from '@/shared/ui/deprecated/Modal';
import { Input } from '@/shared/ui/deprecated/Input';
import { Button, ButtonTheme } from '@/shared/ui/deprecated/Button';
import { Drawer } from '@/shared/ui/deprecated/Drawer';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';

interface RatingCardProps {
    className?: string;
    title?: string;
    feedbackTitle?: string;
    hasFeedback?: boolean;
    onAccept?: (starsCount: number, feedback?: string) => void;
    onCancel?: (starsCount: number) => void;
    rate?: number;
}

export const RatingCard = memo((props: RatingCardProps) => {
    const { t } = useTranslation();
    const { className, title, feedbackTitle, hasFeedback, onAccept, onCancel, rate = 0 } = props;
    const [modalOpen, setModalOpen] = useState(false);
    const [feedback, setFeedBack] = useState('');
    const [starsCount, setStarsCount] = useState(rate);

    const onSelectedStars = useCallback(
        (stars: number) => {
            if (!hasFeedback) {
                setModalOpen(true);
            } else {
                onAccept?.(stars);
            }
            setStarsCount(stars);
        },
        [hasFeedback, onAccept],
    );

    const acceptHandler = useCallback(() => {
        setModalOpen(false);
        onAccept?.(starsCount, feedback);
    }, [feedback, onAccept, starsCount]);

    const cancelHandler = useCallback(() => {
        setModalOpen(false);
        onCancel?.(starsCount);
    }, [onCancel, starsCount]);

    const modalContent = (
        <VStack gap={16} max>
            <Text title={feedbackTitle} />
            <Input onChange={setFeedBack} value={feedback} />
        </VStack>
    );
    return (
        <Card data-testid="RatingCard" className={classNames(cls.RatingCard, {}, [className])}>
            <VStack align="center" gap={32} max>
                <Text title={starsCount ? t('Спасибо за оценку') : title} />
                <StarRating selectedStars={rate} onSelect={onSelectedStars} />
            </VStack>
            <BrowserView>
                <Modal isOpen={modalOpen} lazy>
                    {modalContent}
                    <HStack max>
                        <Button data-testid="RatingCard.SendButton" fullWidth onClick={acceptHandler}>
                            {t('Отправить')}
                        </Button>
                        <Button
                            data-testid="RatingCard.CloseButton"
                            fullWidth
                            onClick={cancelHandler}
                            theme={ButtonTheme.OUTLINE_RED}
                        >
                            {t('Закрыть')}
                        </Button>
                    </HStack>
                </Modal>
            </BrowserView>
            <MobileView>
                <Drawer isOpen={modalOpen} lazy onClose={() => setModalOpen(false)}>
                    {modalContent}
                </Drawer>
            </MobileView>
        </Card>
    );
});
