import React, { InputHTMLAttributes, memo, ReactNode, useState } from 'react';
import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import cls from './Input.module.scss';
import { HStack } from '../Stack';
import { Text } from '../Text';

type HTMLInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange' | 'readOnly' | 'size'>;

type InputSize = 's' | 'm' | 'l';
interface InputProps extends HTMLInputProps {
    className?: string;
    value?: string | number;
    onChange?: (value: string) => void;
    placeholder?: string;
    label?: string;
    autofocus?: boolean;
    readonly?: boolean;
    addonLeft?: ReactNode;
    addonRight?: ReactNode;
    size?: InputSize;
}

export const Input = memo((props: InputProps) => {
    const {
        className,
        value,
        onChange,
        type = 'text',
        placeholder,
        label,
        autofocus,
        readonly,
        addonLeft,
        addonRight,
        size = 'm',
        ...otherProps
    } = props;

    const [isFocused, setIsFocused] = useState(false);

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange?.(e.target.value);
    };
    const onBlur = () => {
        setIsFocused(false);
    };
    const onFocused = () => {
        setIsFocused(true);
    };

    const mods: Mods = {
        [cls.readonly]: readonly,
        [cls.focused]: isFocused,
        [cls.withAddonLeft]: Boolean(addonLeft),
        [cls.withAddonRight]: Boolean(addonRight),
    };

    const input = (
        <div className={classNames(cls.InputWrapper, mods, [className, cls[size]])}>
            <div className={cls.addonLeft}>{addonLeft}</div>
            <input
                className={cls.input}
                onFocus={onFocused}
                onBlur={onBlur}
                type={type}
                value={value}
                onChange={onChangeHandler}
                readOnly={readonly}
                placeholder={placeholder}
                {...otherProps}
            />
            <div className={cls.addonRight}>{addonRight}</div>
        </div>
    );

    if (label) {
        return (
            <HStack gap={8} max>
                <Text text={label} />
                {input}
            </HStack>
        );
    }
    return input;
});
