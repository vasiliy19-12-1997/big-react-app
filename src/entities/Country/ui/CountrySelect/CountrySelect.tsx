import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { ToggleFeatures } from '@/shared/features';
import { ListBox as ListBoxDeprecated } from '@/shared/ui/deprecated/Popups';
import { ListBox } from '@/shared/ui/redesigned/Popups';
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
export const CountrySelect = memo(({ className, onChange, value, readonly }: CountrySelectProps) => {
    const { t } = useTranslation();
    const onChangeCountry = useCallback(
        (value: string) => {
            onChange?.(value as Country);
        },
        [onChange],
    );

    const props = {
        className,
        onChange: onChangeCountry,
        value,
        defaultValue: t('Укажите страну'),
        readonly,
        items: options,
        direction: 'top right' as const,
        label: t('Укажите страну'),
    };

    return (
        <ToggleFeatures name="isNewDesignEnabled" on={<ListBox {...props} />} off={<ListBoxDeprecated {...props} />} />
    );
});
