import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Country } from '@/entities/Country';
import { Currency } from '@/entities/Currency';
import { ProfileCard, ValidateProfileErrors } from '@/entities/Profile';
import { DynamicModuleLoader, ReducersList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { VStack } from '@/shared/ui/Stack';
import { Text, TextTheme } from '@/shared/ui/Text/Text';
import { useUpdateProfileData } from '../../api/editableProfileCardApi';
import { getProfileReadonly } from '../../model/selectors/getProfileReadonly/getProfileReadonly';
import { getProfileValidateErrors } from '../../model/selectors/getProfileValidateErrors/getProfileValidateErrors';
import { profileReducers } from '../../model/slice/profileSlice';
import { EditableProfileCardHeader } from '../EditableProfileCardHeader/EditableProfileCardHeader';

interface EditableProfileCardProps {
  className?: string;
  id:string
}

export const EditableProfileCard = (props: EditableProfileCardProps) => {
    const { className, id } = props;
    const { t } = useTranslation('profile');

    const readonly = useSelector(getProfileReadonly);
    const validateProfileErrors = useSelector(getProfileValidateErrors);
    const [
        updateProfile,
        { isLoading: isUpdating },
    ] = useUpdateProfileData();
    const validateErrorTranslation:any = {
        [ValidateProfileErrors.INCORRECT_AGE]: t('Некооректный возраст'),
        [ValidateProfileErrors.INCORRECT_COUNTRY]: t('Некооректный страна'),
        [ValidateProfileErrors.INCORRECT_USER_DATA]: t('Некооректное имя'),
        [ValidateProfileErrors.NO_DATA]: t('Нету данных'),
        [ValidateProfileErrors.SERVER_ERROR]: t('Серверная ошибка'),
    };

    const dispatch = useAppDispatch();

    const reducers:ReducersList = {
        profile: profileReducers,
    };
    const onChangeFirstname = useCallback((value?:string) => {
        updateProfile({ first: value || '', id });
    }, [id, updateProfile]);
    const onChangeLastname = useCallback((value?:string) => {
        updateProfile({ lastname: value || '', id });
    }, [id, updateProfile]);
    const onChangeAge = useCallback((value:string) => {
        if (/^\d+$/.test(value)) {
            updateProfile({ age: Number(value || 0), id });
        } else {
            updateProfile({ age: 0, id });
        }
    }, [id, updateProfile]);
    const onChangeCity = useCallback((value?:string) => {
        updateProfile({ city: value || '', id });
    }, [id, updateProfile]);
    const onChangeUsername = useCallback((value?:string) => {
        updateProfile({ username: value || '', id });
    }, [id, updateProfile]);
    const onChangeAvatar = useCallback((value?:string) => {
        updateProfile({ avatar: value || '', id });
    }, [id, updateProfile]);
    const onChangeCurrency = useCallback((value?:Currency) => {
        updateProfile({ currency: value, id });
    }, [id, updateProfile]);
    const onChangeCountry = useCallback((value?:Country) => {
        updateProfile({ country: value, id });
    }, [id, updateProfile]);

    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
            <VStack max gap={8}>
                <EditableProfileCardHeader />
                {validateProfileErrors?.length && validateProfileErrors.map((err) => (
                    <Text
                        theme={TextTheme.ERROR}
                        text={validateErrorTranslation[err]}
                        key={validateErrorTranslation[err]}
                        data-testid="EditableProfileCard.Error"
                    />
                ))}
                <ProfileCard
                    onChangeFirstname={onChangeFirstname}
                    onChangeLastname={onChangeLastname}
                    onChangeAge={onChangeAge}
                    onChangeCity={onChangeCity}
                    onChangeUsername={onChangeUsername}
                    onChangeAvatar={onChangeAvatar}
                    onChangeCurrency={onChangeCurrency}
                    onChangeCountry={onChangeCountry}
                    readonly={readonly}
                    id={id}
                />
            </VStack>
        </DynamicModuleLoader>

    );
};
