import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import { ListBox } from '@/shared/ui/deprecated/Popups';
import { Country } from '../../model/types/country';

interface CountrySelectProps {
    className?: string;
    onChange?: (value: Country) => void;
    value?: Country;
    readonly?: boolean;
}
const options = [
    { value: Country.Belarus, content: Country.Belarus },
    { value: Country.Czech, content: Country.Czech },
    { value: Country.Irish, content: Country.Irish },
    { value: Country.Russia, content: Country.Russia },
];
export const CountrySelect = memo((props: CountrySelectProps) => {
    const { t } = useTranslation();
    const { className, onChange, value, readonly } = props;
    const onChangeCountry = useCallback(
        (value: string) => {
            onChange?.(value as Country);
        },
        [onChange],
    );
    return (
        <ListBox
            className={classNames('', {}, [className])}
            items={options}
            onChange={onChangeCountry}
            value={value}
            readonly={readonly}
            direction="bottom right"
            label={t('Укажите страну')}
        />
    );
});
