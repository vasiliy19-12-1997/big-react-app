import { useTranslation } from 'react-i18next';
import { classNames, Mods } from 'shared/lib/classNames/classNames';
import { Avatar } from 'shared/ui/Avatar/Avatar';
import { Input } from 'shared/ui/Input/Input';
import { Loader } from 'shared/ui/Loader/Loader';
import { Text, TextAlign, TextTheme } from 'shared/ui/Text/Text';
import { Currency, CurrencySelect } from 'entities/Currency';
import { CountrySelect } from 'entities/Country/ui/CountrySelect/CountrySelect';
import { Country } from 'entities/Country';
import { HStack, VStack } from 'shared/ui';
import { Profile } from '../../model/types/profile';
import cls from './ProfileCard.module.scss';

interface ProfileCardProps {
  className?: string
  data?:Profile
  isLoading?:boolean
  error?:string
  onChangeFirstname?:(value:string)=>void
  onChangeLastname?:(value:string)=>void
  onChangeAge?:(value:string)=>void
  onChangeCity?:(value:string)=>void
  onChangeUsername?:(value:string)=>void
  onChangeAvatar?:(value:string)=>void
  onChangeCurrency?:(value:Currency)=>void
  onChangeCountry?:(value:Country)=>void
  readonly?:boolean
}

export const ProfileCard = (props: ProfileCardProps) => {
    const { t } = useTranslation();
    const {
        className,
        data,
        isLoading,
        error,
        onChangeFirstname,
        onChangeLastname,
        onChangeAge,
        onChangeCity,
        onChangeUsername,
        onChangeAvatar,
        onChangeCurrency,
        onChangeCountry,
        readonly,
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
    const mods:Mods = {
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
                />
                <Input
                    value={data?.lastname}
                    onChange={onChangeLastname}
                    placeholder={t('Выше фамилия')}
                    className={cls.input}
                    readonly={readonly}
                />
                <Input
                    value={data?.age}
                    onChange={onChangeAge}
                    placeholder={t('Выш возраст')}
                    className={cls.input}
                    readonly={readonly}
                />
                <Input
                    value={data?.city}
                    onChange={onChangeCity}
                    placeholder={t('Ваш город')}
                    className={cls.input}
                    readonly={readonly}
                />
                <Input
                    value={data?.username}
                    onChange={onChangeUsername}
                    placeholder={t('Ваш никнейм')}
                    className={cls.input}
                    readonly={readonly}
                />
                <Input
                    value={data?.avatar}
                    onChange={onChangeAvatar}
                    placeholder={t('Ваш аватар')}
                    className={cls.input}
                    readonly={readonly}
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
