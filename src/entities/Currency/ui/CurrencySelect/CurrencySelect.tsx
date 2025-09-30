import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { Currency } from '../../model/types/currency';
import { ListBox } from 'shared/ui/Popups';

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
        <ListBox
            className={classNames('', {}, [className])}
            onChange={onChangeCurrency}
            value={value}
            readonly={readonly}
            items={options}
            direction="bottom left"
            label={t('Укажите валюту')}
        />

    );
});
