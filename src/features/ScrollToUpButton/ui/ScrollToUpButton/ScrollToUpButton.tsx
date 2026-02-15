import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Icon } from '@/shared/ui/redesigned/Icon';
import cls from './ScrollToUpButton.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import ArrowUpIcon from '@/shared/assets/icons/circle-up.svg';

interface ScrollToUpButtonProps {
    className?: string;
}

export const ScrollToUpButton = memo((props: ScrollToUpButtonProps) => {
    const { className } = props;
    const { t } = useTranslation();
    const onClickHandler = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };
    return (
        <Icon
            Svg={ArrowUpIcon}
            onClick={onClickHandler}
            width={32}
            height={32}
            clickable
            className={classNames(cls.ScrollToUpButton, {}, [className])}
        />
    );
});
