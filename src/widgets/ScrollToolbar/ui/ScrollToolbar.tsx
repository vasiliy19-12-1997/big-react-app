import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollToUpButton } from '@/features/ScrollToUpButton';
import { classNames } from '@/shared/lib/classNames/classNames';
import { VStack } from '@/shared/ui/redesigned/Stack';
import cls from './ScrollToolbar.module.scss';

interface ScrollToolbarProps {
    className?: string;
}

export const ScrollToolbar = memo((props: ScrollToolbarProps) => {
    const { t } = useTranslation();
    const { className } = props;

    return (
        <VStack justify="center" align="center" max className={classNames(cls.ScrollToolbar, {}, [className])}>
            <ScrollToUpButton />
        </VStack>
    );
});
