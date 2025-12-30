import { HTMLAttributes, memo, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Card.module.scss';

export enum CardTheme {
    NORMAL = 'normal',
    OUTLINED = 'outlined',
}
interface CardProps extends HTMLAttributes<HTMLDivElement> {
    className?: string;
    children: ReactNode;
    theme?: CardTheme;
}

export const Card = memo((props: CardProps) => {
    const { t } = useTranslation();
    const { className, children, theme = CardTheme.NORMAL, ...otherProps } = props;

    return (
        <div className={classNames(cls.card, {}, [className, cls[theme]])} {...otherProps}>
            {children}
        </div>
    );
});
