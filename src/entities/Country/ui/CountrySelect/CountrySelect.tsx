import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { Select } from 'shared/ui/Select/Select';
import { memo, useCallback } from 'react';
import { Country } from '../../model/types/country';

interface CountrySelectProps {
  className?: string;
  onChange?:(value:Country)=>void;
  value?:Country
  readonly?:boolean
}
const options = [
    { value: Country.Belarus, content: Country.Belarus },
    { value: Country.Czech, content: Country.Czech },
    { value: Country.Irish, content: Country.Irish },
    { value: Country.Russia, content: Country.Russia },
];
export const CountrySelect = memo((props: CountrySelectProps) => {
    const { t } = useTranslation();
    const {
        className,
        onChange,
        value,
        readonly,
    } = props;
    const onChangeCountry = useCallback((value:string) => {
        onChange?.(value as Country);
    }, [onChange]);
    return (
        <Select
            className={classNames('', {}, [className])}
            label={t('Укажите страну')}
            options={options}
            onChange={onChangeCountry}
            value={value}
            readonly={readonly}
        />

    );
});
