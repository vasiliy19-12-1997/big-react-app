import { memo, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { isMobile } from 'react-device-detect';
import { Modal } from '@/shared/ui/deprecated/Modal';
import { Text } from '@/shared/ui/deprecated/Text';
import { classNames } from '@/shared/lib/classNames/classNames';
import { saveJsonSettings, useJsonSettings } from '@/entities/User';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Drawer } from '@/shared/ui/deprecated/Drawer';

export const ArticlePageGreeting = memo(() => {
    const { t } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);
    const { isFirstVisit } = useJsonSettings();
    const dispatch = useAppDispatch();
    useEffect(() => {
        if (isFirstVisit) {
            setIsOpen(true);
            dispatch(saveJsonSettings({ isFirstVisit: false }));
        }
    }, [dispatch, isFirstVisit]);
    const onClose = () => {
        setIsOpen(false);
    };
    const text = (
        <Text title={t('Добро пожаловать на страницу')} text={t('Здесь вы можете посмотреть профили, статьи')} />
    );
    if (isMobile) {
        return (
            <Drawer lazy isOpen={isOpen} onClose={onClose}>
                {text}
            </Drawer>
        );
    }
    return (
        <Modal lazy isOpen={isOpen} onClose={onClose} className={classNames('', {}, [])}>
            {text}
        </Modal>
    );
});
