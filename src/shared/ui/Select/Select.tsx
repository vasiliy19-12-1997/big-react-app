import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { ChangeEvent, useMemo } from 'react';
import cls from './Select.module.scss';

export interface SelectOptions {
    value:string;
    content:string
}
interface SelectProps {
  className?: string;
  label?:string;
  options?:SelectOptions[];
  value?:string;
  onChange?:(value:string)=>void;
}

export const Select = (props: SelectProps) => {
    const { t } = useTranslation();
    const {
        className,
        label,
        options,
        value,
        onChange,
    } = props;
    const optionList = useMemo(() => {
        options?.map((opt) => (
            <option key={value} className={cls.option} value={opt.value}>{opt.content}</option>
        ));
    }, [options, value]);
    const onChangeHandler = (e:ChangeEvent<HTMLSelectElement>) => {
        onChange?.(e.target.value);
    };
    return (
        <div className={classNames(cls.Wrapper, {}, [className])}>
            {label && <span className={cls.label}>{`${label}>`}</span>}
            <select value={value} onChange={onChangeHandler}>
                {optionList}
            </select>
        </div>
    );
};
