import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ProfileCardRedesign.module.scss';
import { Country, CountrySelect } from '@/entities/Country';
import { Currency, CurrencySelect } from '@/entities/Currency';
import { Input } from '@/shared/ui/redesigned/Input';
import { VStack, HStack } from '@/shared/ui/redesigned/Stack';
import { Profile } from '../../model/types/profile';
import { Card } from '@/shared/ui/redesigned/Card';
import { Avatar } from '@/shared/ui/redesigned/Avatar';
import { Sceleton } from '@/shared/ui/redesigned/Sceleton';
import { Text } from '@/shared/ui/redesigned/Text';
import { TextTheme, TextAlign } from '@/shared/ui/deprecated/Text';

export const ProfileCardRedesignError = () => {
    const { t } = useTranslation();

    return (
        <HStack max className={classNames(cls.ProfileCard, {}, ['', cls.error])}>
            <Text
                variant={TextTheme.ERROR}
                align={TextAlign.CENTER}
                title={t('Произошла ошибка при загрузке профиля')}
                text={t('Попробуйте обновить страницу')}
            />
        </HStack>
    );
};

export const ProfileCardRedesignSceleton = () => {
    return (
        <Card max padding="24">
            <VStack max gap={32} justify="center">
                <HStack max>
                    <Sceleton width="100%" height={128} />
                </HStack>
                <HStack max gap={24}>
                    <VStack max gap={16}>
                        <Sceleton width="100%" height={38} />
                        <Sceleton width="100%" height={38} />
                        <Sceleton width="100%" height={38} />
                    </VStack>
                    <VStack max gap={16}>
                        <Sceleton width="100%" height={38} />
                        <Sceleton width="100%" height={38} />
                        <Sceleton width="100%" height={38} />
                    </VStack>
                </HStack>
            </VStack>
        </Card>
    );
};
interface ProfileCardRedesignProps {
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

export const ProfileCardRedesign = memo((props: ProfileCardRedesignProps) => {
    const { t } = useTranslation();
    console.log(props.data?.avatar);
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

    return (
        <Card padding="24" max className={classNames(cls.ProfileCardRedesign, {}, [className])}>
            <VStack gap={32}>
                {data?.avatar && (
                    <HStack justify="center" max className={cls.avatarWrapper}>
                        <Avatar size={128} src={data.avatar} />
                    </HStack>
                )}
                <HStack max gap={24}>
                    <VStack gap={16}>
                        <Input
                            value={data?.first}
                            onChange={onChangeFirstname}
                            label={t('Имя')}
                            className={cls.input}
                            readonly={readonly}
                            data-testid="ProfileCard.firstname"
                        />
                        <Input
                            value={data?.lastname}
                            onChange={onChangeLastname}
                            label={t('Фамилия')}
                            className={cls.input}
                            readonly={readonly}
                            data-testid="ProfileCard.lastname"
                        />
                        <Input
                            value={data?.age}
                            onChange={onChangeAge}
                            label={t('Возраст')}
                            className={cls.input}
                            readonly={readonly}
                            data-testid="ProfileCard.age"
                        />
                        <Input
                            value={data?.city}
                            onChange={onChangeCity}
                            label={t('Город')}
                            className={cls.input}
                            readonly={readonly}
                            data-testid="ProfileCard.city"
                        />
                    </VStack>
                    <VStack max gap={16}>
                        <Input
                            value={data?.username}
                            onChange={onChangeUsername}
                            label={t('Ваш никнейм')}
                            className={cls.input}
                            readonly={readonly}
                            data-testid="ProfileCard.nickname"
                        />
                        <Input
                            value={data?.avatar}
                            onChange={onChangeAvatar}
                            label={t('Ваш аватар')}
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
                </HStack>
            </VStack>
        </Card>
    );
});
