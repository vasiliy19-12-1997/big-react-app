import { Country } from 'entities/Country';
import { CountrySelect } from 'entities/Country/ui/CountrySelect/CountrySelect';
import { Currency, CurrencySelect } from 'entities/Currency';
import { useFetchProfileData, useUpdateProfileData } from 'features/EditableProfileCard/api/editableProfileCardApi';
import { useTranslation } from 'react-i18next';
import { classNames, Mods } from 'shared/lib/classNames/classNames';
import { Avatar } from 'shared/ui/Avatar/Avatar';
import { Input } from 'shared/ui/Input/Input';
import { Loader } from 'shared/ui/Loader/Loader';
import { HStack, VStack } from 'shared/ui/Stack';
import { Text, TextAlign, TextTheme } from 'shared/ui/Text/Text';
import cls from './ProfileCard.module.scss';

interface ProfileCardProps {
  className?: string
  onChangeFirstname?:(value:string)=>void
  onChangeLastname?:(value:string)=>void
  onChangeAge?:(value:string)=>void
  onChangeCity?:()=>void
  onChangeUsername?:(value:string)=>void
  onChangeAvatar?:(value:string)=>void
  onChangeCurrency?:(value:Currency)=>void
  onChangeCountry?:(value:Country)=>void
  readonly?:boolean
  id?:string
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
    } = props;
    const { data: formData, isLoading, isError } = useFetchProfileData(id);
    if (isLoading) {
        return (
            <HStack max className={classNames(cls.ProfileCard, {}, [className, cls.loading])}>
                <Loader />
            </HStack>
        );
    }
    if (isError) {
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
    const mods:Mods = {
        [cls.editing]: !readonly,
    };
    return (
        <VStack align="center" max className={classNames(cls.ProfileCard, mods, [className])}>
            <VStack max className={cls.data}>
                {formData?.avatar && (
                    <div className={cls.avatarWrapper}>
                        <Avatar src={formData.avatar} />
                    </div>
                )}
                <Input
                    value={formData?.first}
                    onChange={onChangeFirstname}
                    placeholder={t('Выше имя')}
                    className={cls.input}
                    readonly={readonly}
                    data-testid="ProfileCard.firsname"
                />
                <Input
                    value={formData?.lastname}
                    onChange={onChangeLastname}
                    placeholder={t('Выше фамилия')}
                    className={cls.input}
                    readonly={readonly}
                    data-testid="ProfileCard.lastname"
                />
                <Input
                    value={formData?.age}
                    onChange={onChangeAge}
                    placeholder={t('Выш возраст')}
                    className={cls.input}
                    readonly={readonly}
                    data-testid="ProfileCard.age"
                />
                <Input
                    value={formData?.city}
                    onChange={onChangeCity}
                    placeholder={t('Ваш город')}
                    className={cls.input}
                    readonly={readonly}
                    data-testid="ProfileCard.city"
                />
                <Input
                    value={formData?.username}
                    onChange={onChangeUsername}
                    placeholder={t('Ваш никнейм')}
                    className={cls.input}
                    readonly={readonly}
                    data-testid="ProfileCard.nickname"
                />
                <Input
                    value={formData?.avatar}
                    onChange={onChangeAvatar}
                    placeholder={t('Ваш аватар')}
                    className={cls.input}
                    readonly={readonly}
                    data-testid="ProfileCard.avatar"
                />
                <CurrencySelect
                    className={cls.input}
                    value={formData?.currency}
                    onChange={onChangeCurrency}
                    readonly={readonly}
                />
                <CountrySelect
                    className={cls.input}
                    value={formData?.country}
                    onChange={onChangeCountry}
                    readonly={readonly}
                />
            </VStack>
        </VStack>
    );
};
