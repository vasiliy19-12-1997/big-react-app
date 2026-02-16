import { ButtonHTMLAttributes, FC, ForwardedRef, forwardRef, memo, ReactNode } from 'react';
import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import cls from './Button.module.scss';

export type ButtonVariant = 'clear' | 'outline' | 'filled';
export type ButtonColor = 'normal' | 'succes' | 'error';
/**
 * Размер кнопки
 */
export type ButtonSize = 'm' | 'l' | 'xl';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string;
    /**
     * Тема кнопки
     */
    variant?: ButtonVariant;
    /**
     * Квадратная кнопка
     */
    square?: boolean;
    /**
     * Размер кнопки
     */
    size?: ButtonSize;
    /**
     * Заблокировать кнопку
     */
    disabled?: boolean;
    /**
     * Растянуть кнопку на всю ширину контейнера
     */
    fullWidth?: boolean;
    /**
     * Дополнительные параметры для кнопки например иконка
     */
    addonLeft?: ReactNode;
    addonRight?: ReactNode;
    /**
     * Цвета кнопки
     */
    color?: ButtonColor;
}

export const Button: FC<ButtonProps> = forwardRef((props: ButtonProps, ref: ForwardedRef<HTMLButtonElement>) => {
    const {
        className,
        children,
        variant = 'outline',
        square,
        size = 'm',
        disabled,
        fullWidth,
        addonLeft,
        addonRight,
        color = 'normal',
        ...otherProps
    } = props;
    const mods: Mods = {
        [cls.square]: square,
        [cls.disabled]: disabled,
        [cls.fullWidth]: fullWidth,
        [cls.withAddon]: Boolean(addonLeft || addonRight),
    };
    return (
        <button
            type="button"
            className={classNames(cls.Button, mods, [className, cls[variant], cls[size], cls[color]])}
            disabled={disabled}
            ref={ref}
            {...otherProps}
        >
            <div className={cls.addonLeft}>{addonLeft}</div>
            {children}
            <div className={cls.addonRight}>{addonRight}</div>
        </button>
    );
});
