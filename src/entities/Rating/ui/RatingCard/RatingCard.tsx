import { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BrowserView, MobileView } from 'react-device-detect';
import cls from './RatingCard.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Card as CardDeprecated } from '@/shared/ui/deprecated/Card';
import { Text as TextDeprecated } from '@/shared/ui/deprecated/Text';
import { StarRating } from '@/shared/ui/deprecated/StarRating';
import { Modal } from '@/shared/ui/redesigned/Modal';
import { Input as InputDeprecated } from '@/shared/ui/deprecated/Input';
import { Button as ButtonDeprecated, ButtonTheme } from '@/shared/ui/deprecated/Button';
import { Drawer } from '@/shared/ui/redesigned/Drawer';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { ToggleFeatures } from '@/shared/features';
import { Text } from '@/shared/ui/redesigned/Text';
import { Input } from '@/shared/ui/redesigned/Input';
import { Card } from '@/shared/ui/redesigned/Card';

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
            <ToggleFeatures
                name="isNewDesignEnabled"
                on={
                    <>
                        <Text title={feedbackTitle} />
                        <Input onChange={setFeedBack} value={feedback} />
                    </>
                }
                off={
                    <>
                        <TextDeprecated title={feedbackTitle} />
                        <InputDeprecated onChange={setFeedBack} value={feedback} />
                    </>
                }
            />
            <TextDeprecated title={feedbackTitle} />
            <InputDeprecated onChange={setFeedBack} value={feedback} />
        </VStack>
    );

    const content = (
        <>
            <VStack align="center" gap={32} max>
                <ToggleFeatures
                    name="isNewDesignEnabled"
                    on={<TextDeprecated title={starsCount ? t('Спасибо за оценку') : title} />}
                    off={<TextDeprecated title={starsCount ? t('Спасибо за оценку') : title} />}
                />

                <StarRating selectedStars={rate} onSelect={onSelectedStars} />
            </VStack>
            <BrowserView>
                <Modal isOpen={modalOpen} lazy>
                    {modalContent}
                    <ToggleFeatures
                        name="isNewDesignEnabled"
                        on={
                            <HStack max>
                                <ButtonDeprecated data-testid="RatingCard.SendButton" fullWidth onClick={acceptHandler}>
                                    {t('Отправить')}
                                </ButtonDeprecated>
                                <ButtonDeprecated
                                    data-testid="RatingCard.CloseButton"
                                    fullWidth
                                    onClick={cancelHandler}
                                    theme={ButtonTheme.OUTLINE_RED}
                                >
                                    {t('Закрыть')}
                                </ButtonDeprecated>
                            </HStack>
                        }
                        off={
                            <HStack max>
                                <ButtonDeprecated data-testid="RatingCard.SendButton" fullWidth onClick={acceptHandler}>
                                    {t('Отправить')}
                                </ButtonDeprecated>
                                <ButtonDeprecated
                                    data-testid="RatingCard.CloseButton"
                                    fullWidth
                                    onClick={cancelHandler}
                                    theme={ButtonTheme.OUTLINE_RED}
                                >
                                    {t('Закрыть')}
                                </ButtonDeprecated>
                            </HStack>
                        }
                    />
                </Modal>
            </BrowserView>
            <MobileView>
                <Drawer isOpen={modalOpen} lazy onClose={() => setModalOpen(false)}>
                    {modalContent}
                </Drawer>
            </MobileView>
        </>
    );
    return (
        <ToggleFeatures
            name="isNewDesignEnabled"
            on={
                <Card
                    max
                    border="round"
                    padding="24"
                    data-testid="RatingCard"
                    className={classNames(cls.RatingCard, {}, [className])}
                >
                    {content}
                </Card>
            }
            off={
                <CardDeprecated data-testid="RatingCard" className={classNames(cls.RatingCard, {}, [className])}>
                    {content}
                </CardDeprecated>
            }
        />
    );
});
