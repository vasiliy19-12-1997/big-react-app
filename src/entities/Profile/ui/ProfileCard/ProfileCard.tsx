import { useTranslation } from 'react-i18next';
import { Country, CountrySelect } from '@/entities/Country';
import { Currency, CurrencySelect } from '@/entities/Currency';
import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import { Avatar } from '@/shared/ui/deprecated/Avatar';
import { Input } from '@/shared/ui/deprecated/Input';
import { Loader } from '@/shared/ui/deprecated/Loader';
import { Text, TextAlign, TextTheme } from '@/shared/ui/deprecated/Text';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { Profile } from '../../model/types/profile';
import cls from './ProfileCard.module.scss';

interface ProfileCardProps {
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

export const ProfileCard = (props: ProfileCardProps) => {
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
    if (isLoading) {
        return (
            <HStack max className={classNames(cls.ProfileCard, {}, [className, cls.loading])}>
                <Loader />
            </HStack>
        );
    }
    if (error) {
        return (
            <HStack max className={classNames(cls.ProfileCard, {}, [className, cls.error])}>
                <Text
                    theme={TextTheme.ERROR}
                    align={TextAlign.CENTER}
                    title={t('Произошла ошибка при загрузке профиля')}
                    text={t('Попробуйте обновить страницу')}
                />
            </HStack>
        );
    }
    const mods: Mods = {
        [cls.editing]: !readonly,
    };
    return (
        <VStack align="center" max className={classNames(cls.ProfileCard, mods, [className])}>
            <VStack max className={cls.data}>
                {data?.avatar && (
                    <div className={cls.avatarWrapper}>
                        <Avatar src={data.avatar} />
                    </div>
                )}
                <Input
                    value={data?.first}
                    onChange={onChangeFirstname}
                    placeholder={t('Выше имя')}
                    className={cls.input}
                    readonly={readonly}
                    data-testid="ProfileCard.firstname"
                />
                <Input
                    value={data?.lastname}
                    onChange={onChangeLastname}
                    placeholder={t('Выше фамилия')}
                    className={cls.input}
                    readonly={readonly}
                    data-testid="ProfileCard.lastname"
                />
                <Input
                    value={data?.age}
                    onChange={onChangeAge}
                    placeholder={t('Выш возраст')}
                    className={cls.input}
                    readonly={readonly}
                    data-testid="ProfileCard.age"
                />
                <Input
                    value={data?.city}
                    onChange={onChangeCity}
                    placeholder={t('Ваш город')}
                    className={cls.input}
                    readonly={readonly}
                    data-testid="ProfileCard.city"
                />
                <Input
                    value={data?.username}
                    onChange={onChangeUsername}
                    placeholder={t('Ваш никнейм')}
                    className={cls.input}
                    readonly={readonly}
                    data-testid="ProfileCard.nickname"
                />
                <Input
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
};
