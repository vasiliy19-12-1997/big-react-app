import { ButtonHTMLAttributes, FC, memo, ReactNode } from 'react';
import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import cls from './Button.module.scss';

export type ButtonVariant = 'clear' | 'outline' | 'filled';
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
}

export const Button: FC<ButtonProps> = memo((props: ButtonProps) => {
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
            className={classNames(cls.Button, mods, [className, cls[variant], cls[size]])}
            disabled={disabled}
            {...otherProps}
        >
            <div className={cls.addonLeft}>{addonLeft}</div>
            {children}
            <div className={cls.addonRight}>{addonRight}</div>
        </button>
    );
});
