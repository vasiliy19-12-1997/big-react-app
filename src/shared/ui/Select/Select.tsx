import {
    ChangeEvent,
    useMemo,
} from 'react';
import { useTranslation } from 'react-i18next';
import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import cls from './Select.module.scss';

export interface SelectOptions <T extends string > {
    value:T;
    content:string
}

interface SelectProps <T extends string > {
  className?: string;
  label?:string;
  options?:SelectOptions<T>[];
  value?:T;
  onChange?: (value:T) => void;
  readonly?:boolean
}

export const Select = <T extends string> (props: SelectProps<T>) => {
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
        if (onChange) {
            onChange(e.target.value as T);
        }
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
};
