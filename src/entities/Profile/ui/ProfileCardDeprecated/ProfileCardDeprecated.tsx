import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Country, CountrySelect } from '@/entities/Country';
import { Currency, CurrencySelect } from '@/entities/Currency';
import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import { Avatar as AvatarDeprecated } from '@/shared/ui/deprecated/Avatar';
import { Input as InputDeprecated } from '@/shared/ui/deprecated/Input';
import { Loader as LoaderDeprecated } from '@/shared/ui/deprecated/Loader';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { Profile } from '../../model/types/profile';
import { TextAlign, Text as TextDeprecated, TextTheme } from '@/shared/ui/deprecated/Text';
import cls from './ProfileCardDeprecated.module.scss';

export const ProfileCardDeprecatedError = () => {
    const { t } = useTranslation();

    return (
        <HStack max className={classNames(cls.ProfileCard, {}, ['', cls.error])}>
            <TextDeprecated
                theme={TextTheme.ERROR}
                align={TextAlign.CENTER}
                title={t('Произошла ошибка при загрузке профиля')}
                text={t('Попробуйте обновить страницу')}
            />
        </HStack>
    );
};

export const ProfileCardDeprecatedLoader = () => {
    return (
        <HStack max className={classNames(cls.ProfileCard, {}, ['', cls.loading])}>
            <LoaderDeprecated />
        </HStack>
    );
};
interface ProfileCardDeprecatedProps {
    className?: string;
    onChangeFirstname?: (value: string) => void;
    onChangeLastname?: (value: string) => void;
    onChangeAge?: (value: string) => void;
    onChangeCity?: () => void;
    onChangeUsername?: (value: string) => void;
    onChangeAvatar?: (value: string) => void;
    onChangeCurrency?: (value: Currency) => void;
    onChangeCountry?: (value: Country) => void;
    readonly?: boolean;
    id?: string;
    data?: Profile;
    isLoading?: boolean;
    error?: string;
}
export const ProfileCardDeprecated = memo((props: ProfileCardDeprecatedProps) => {
    const { t } = useTranslation();
    const {
        className,
        onChangeFirstname,
        onChangeLastname,
        onChangeAge,
        onChangeCity,
        onChangeUsername,
        onChangeAvatar,
        onChangeCurrency,
        onChangeCountry,
        readonly = false,
        id = '1',
        data,
        isLoading,
        error,
    } = props;

    const mods: Mods = {
        [cls.editing]: !readonly,
    };
    return (
        <VStack align="center" max className={classNames(cls.ProfileCard, mods, [className])}>
            {data?.avatar && (
                <HStack justify="center" max className={cls.avatarWrapper}>
                    <AvatarDeprecated src={data.avatar} />
                </HStack>
            )}
            <VStack max className={cls.data}>
                <InputDeprecated
                    value={data?.first}
                    onChange={onChangeFirstname}
                    placeholder={t('Выше имя')}
                    className={cls.input}
                    readonly={readonly}
                    data-testid="ProfileCard.firstname"
                />
                <InputDeprecated
                    value={data?.lastname}
                    onChange={onChangeLastname}
                    placeholder={t('Выше фамилия')}
                    className={cls.input}
                    readonly={readonly}
                    data-testid="ProfileCard.lastname"
                />
                <InputDeprecated
                    value={data?.age}
                    onChange={onChangeAge}
                    placeholder={t('Выш возраст')}
                    className={cls.input}
                    readonly={readonly}
                    data-testid="ProfileCard.age"
                />
                <InputDeprecated
                    value={data?.city}
                    onChange={onChangeCity}
                    placeholder={t('Ваш город')}
                    className={cls.input}
                    readonly={readonly}
                    data-testid="ProfileCard.city"
                />
                <InputDeprecated
                    value={data?.username}
                    onChange={onChangeUsername}
                    placeholder={t('Ваш никнейм')}
                    className={cls.input}
                    readonly={readonly}
                    data-testid="ProfileCard.nickname"
                />
                <InputDeprecated
                    value={data?.avatar}
                    onChange={onChangeAvatar}
                    placeholder={t('Ваш аватар')}
                    className={cls.input}
                    readonly={readonly}
                    data-testid="ProfileCard.avatar"
                />
                <CurrencySelect
                    className={cls.input}
                    value={data?.currency}
                    onChange={onChangeCurrency}
                    readonly={readonly}
                />
                <CountrySelect
                    className={cls.input}
                    value={data?.country}
                    onChange={onChangeCountry}
                    readonly={readonly}
                />
            </VStack>
        </VStack>
    );
});
