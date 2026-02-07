import { useTranslation } from 'react-i18next';
import { Country } from '@/entities/Country';
import { Currency } from '@/entities/Currency';
import { ToggleFeatures } from '@/shared/features';
import { Profile } from '../../model/types/profile';
import {
    ProfileCardDeprecated,
    ProfileCardDeprecatedError,
    ProfileCardDeprecatedLoader,
} from '../ProfileCardDeprecated/ProfileCardDeprecated';
import {
    ProfileCardRedesign,
    ProfileCardRedesignError,
    ProfileCardRedesignSceleton,
} from '../ProfileCardRedesign/ProfileCardRedesign';

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
    // TODO сделать чтобы лоадер скелетон отображался, сейчас нет
    if (isLoading) {
        return (
            <ToggleFeatures
                name="isNewDesignEnabled"
                on={<ProfileCardRedesignSceleton />}
                off={<ProfileCardDeprecatedLoader />}
            />
        );
    }

    if (error) {
        return (
            <ToggleFeatures
                name="isNewDesignEnabled"
                on={<ProfileCardRedesignError />}
                off={<ProfileCardDeprecatedError />}
            />
        );
    }

    return <ToggleFeatures name="isNewDesignEnabled" on={<ProfileCardRedesign />} off={<ProfileCardDeprecated />} />;
};
