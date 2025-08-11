import { HTMLAttributes, memo, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './Card.module.scss';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  children:ReactNode
}

export const Card = memo((props: CardProps) => {
    const { t } = useTranslation();
    const { className, children, ...otherProps } = props;

    return (
        <div
            className={classNames(cls.card, {}, [className])}
            {...otherProps}
        >
            {children}
        </div>
    );
});
