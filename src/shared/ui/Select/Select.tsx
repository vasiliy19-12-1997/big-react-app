import { classNames, Mods } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import {
    ChangeEvent, memo, SelectHTMLAttributes, useMemo,
} from 'react';
import cls from './Select.module.scss';

 interface SelectOptions {
    value:string;
    content:string
}

interface SelectProps {
  className?: string;
  label?:string;
  options?:SelectOptions[];
  value?:string;
  onChange?: (value:string) => void;
  readonly?:boolean
}

export const Select = memo((props: SelectProps) => {
    const { t } = useTranslation();
    const {
        className,
        label,
        options,
        value,
        onChange,
        readonly,
    } = props;
    const optionList = useMemo(() => options?.map((opt) => (
        <option
            key={opt.value}
            className={cls.option}
            value={opt.value}
        >
            {opt.content}
        </option>
    )), [options]);

    const onChangeHandler = (e:ChangeEvent<HTMLSelectElement>) => {
        onChange?.(e.target.value);
    };
    const mods:Mods = {
        [cls.readonly]: readonly,
    };
    return (
        <div className={classNames(cls.Wrapper, mods, [className])}>
            {label && <span className={cls.label}>{`${label}>`}</span>}
            <select disabled={readonly} value={value} onChange={onChangeHandler}>
                {optionList}
            </select>
        </div>
    );
});
