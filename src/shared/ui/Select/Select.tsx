import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import cls from './Select.module.scss';

interface SelectProps {
  className?: string;
  label?:string;
}

export const Select = (props: SelectProps) => {
    const { t } = useTranslation();
    const {
        className,
        label,
    } = props;
    return (
        <div className={classNames(cls.Wrapper, {}, [className])}>
            {label && <span className={cls.label}>{`${label}>`}</span>}
            <select className={cls.select}>
                <option className={cls.option}>1</option>
                <option className={cls.option}>2</option>
                <option className={cls.option}>3</option>
            </select>
        </div>
    );
};
