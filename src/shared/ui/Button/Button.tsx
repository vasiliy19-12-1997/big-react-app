import { ButtonHTMLAttributes, FC } from 'react';
import { ClassNames } from 'shared/lib/classNames/classNames';
import s from './Button.module.scss';

export const enum ButtonTheme {
  CLEAR = 'clear',
}
interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  theme?: ButtonTheme;
}

export const Button: FC<IButtonProps> = (props) => {
    const {
        className, children, theme, ...otherProps
    } = props;
    return (
        <button
            type="button"
            {...otherProps}
            className={ClassNames(s.Button, { [s[theme]]: true }, [className])}
        >
            {children}
        </button>
    );
};
