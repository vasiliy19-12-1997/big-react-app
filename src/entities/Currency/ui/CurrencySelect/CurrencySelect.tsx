import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { Select } from 'shared/ui/Select/Select';
import { Currency } from 'entities/Currency/model/types/currency';
import { memo, useCallback } from 'react';

interface CurrencySelectProps {
  className?: string;
  onChange?:(value:Currency)=>void;
  value?:Currency
  readonly?:boolean
}
const options = [
    { value: Currency.RUB, content: Currency.RUB },
    { value: Currency.USD, content: Currency.USD },
    { value: Currency.EUR, content: Currency.EUR },
];
export const CurrencySelect = memo((props: CurrencySelectProps) => {
    const { t } = useTranslation();
    const {
        className,
        onChange,
        value,
        readonly,
    } = props;
    const onChangeCurrency = useCallback((value:string) => {
        onChange?.(value as Currency);
    }, [onChange]);
    return (
        <Select
            className={classNames('', {}, [className])}
            label={t('Укажите валюту')}
            options={options}
            onChange={onChangeCurrency}
            value={value}
            readonly={readonly}
        />

    );
});
