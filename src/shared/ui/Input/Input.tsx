import React, {
    InputHTMLAttributes, memo, useEffect, useRef, useState,
} from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './Input.module.scss';

type HTMLInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'>
interface InputProps extends HTMLInputProps {
    className?: string;
    value?:string;
    onChange?:(value:string)=>void;
    placeholder?:string;
    autofocus?:boolean;
}

export const Input = memo((props: InputProps) => {
    const [isFocused, setIsFocused] = useState(false);
    const [caretPosition, setCaretPosition] = useState(0);
    const caretRef = useRef<HTMLInputElement>(null);
    const {
        className,
        value,
        onChange,
        type = 'text',
        placeholder,
        autofocus,
        ...otherProps
    } = props;
    const onChangeHandler = (e:React.ChangeEvent<HTMLInputElement>) => {
        onChange?.(e.target.value);
        setCaretPosition(e.target.value.length);
    };
    const onBlur = () => {
        setIsFocused(false);
    };
    const onFocused = () => {
        setIsFocused(true);
    };
    const onSelect = (e:any) => {
        setCaretPosition(e?.target?.selectionStart || 0);
    };
    useEffect(() => {
        if (autofocus) {
            setIsFocused(true);
            caretRef.current.focus();
        }
    }, [autofocus]);
    return (
        <div className={classNames(cls.InputWrapper, {}, [className])}>
            {placeholder && (
                <div className={cls.placeholder}>{`${placeholder}>`}</div>
            )}
            <div className={cls.caretWrapper}>
                <input
                    ref={caretRef}
                    onFocus={onFocused}
                    onBlur={onBlur}
                    className={cls.input}
                    type={type}
                    value={value}
                    onChange={onChangeHandler}
                    onSelect={onSelect}
                    {...otherProps}
                />
                {isFocused && (
                    <span
                        style={{ left: `${caretPosition * 9}px` }}
                        className={cls.caret}
                    />
                )}
            </div>
        </div>
    );
});
