import { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BrowserView, MobileView } from 'react-device-detect';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './RatingCard.module.scss';
import { Card } from '@/shared/ui/Card/Card';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text/Text';
import { StarRating } from '@/shared/ui/StarRating/StarRating';
import { Modal } from '@/shared/ui/Modal/Modal';
import { Input } from '@/shared/ui/Input/Input';
import { Button, ButtonTheme } from '@/shared/ui/Button/Button';
import { Drawer } from '@/shared/ui/Drawer/Drawer';

interface RatingCardProps {
  className?: string;
  title?:string;
  feedbackTitle?:string;
  hasFeedback?:boolean;
  onAccept?:(starsCount:number, feedback?:string)=>void;
  onCancel?:(starsCount:number)=>void
  rate?:number
}

export const RatingCard = memo((props: RatingCardProps) => {
    const { t } = useTranslation();
    const {
        className, title, feedbackTitle, hasFeedback, onAccept, onCancel, rate = 0,
    } = props;
    const [modalOpen, setModalOpen] = useState(false);
    const [feedback, setFeedBack] = useState('');
    const [starsCount, setStarsCount] = useState(rate);

    const onSelectedStars = useCallback((stars:number) => {
        if (!hasFeedback) {
            setModalOpen(true);
        } else {
            onAccept?.(stars);
        }
        setStarsCount(stars);
    }, [hasFeedback, onAccept]);

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
            <HStack max>
                <Button fullWidth onClick={acceptHandler}>{t('Отправить')}</Button>
                <Button fullWidth onClick={cancelHandler} theme={ButtonTheme.OUTLINE_RED}>{t('Закрыть')}</Button>
            </HStack>
        </VStack>
    );
    return (
        <Card className={classNames(cls.RatingCard, {}, [className])}>
            <VStack align="center" gap={32} max>
                <Text title={title} />
                <StarRating selectedStars={rate} onSelect={onSelectedStars} />
            </VStack>
            <BrowserView>
                <Modal isOpen={modalOpen} lazy>
                    {modalContent}
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
