import { useTranslation } from 'react-i18next';
import { Country } from 'entities/Country';
import { Currency } from 'entities/Currency';
import { ProfileCard } from 'entities/Profile';
import { ValidateProfileErrors } from 'entities/Profile/model/types/profile';
import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect';
import { Text, TextTheme } from 'shared/ui/Text/Text';
import { VStack } from 'shared/ui/Stack';
import { getProfileError } from '../../model/selectors/getProfileError/getProfileError';
import { getProfileForm } from '../../model/selectors/getProfileForm/getProfileForm';
import { getProfileIsLoading } from '../../model/selectors/getProfileIsLoading/getProfileIsLoading';
import { getProfileReadonly } from '../../model/selectors/getProfileReadonly/getProfileReadonly';
import { getProfileValidateErrors } from '../../model/selectors/getProfileValidateErrors/getProfileValidateErrors';
import { fetchProfileData } from '../../model/services/fetchProfileData/fetchProfileData';
import { profileActions, profileReducers } from '../../model/slice/profileSlice';
import { EditableProfileCardHeader } from '../EditableProfileCardHeader/EditableProfileCardHeader';

interface EditableProfileCardProps {
  className?: string;
  id?:string
}

export const EditableProfileCard = (props: EditableProfileCardProps) => {
    const { className, id } = props;
    const { t } = useTranslation('profile');
    const formData = useSelector(getProfileForm);
    const isLoading = useSelector(getProfileIsLoading);
    const error = useSelector(getProfileError);
    const readonly = useSelector(getProfileReadonly);
    const validateProfileErrors = useSelector(getProfileValidateErrors);
    const validateErrorTranslation = {
        [ValidateProfileErrors.INCORRECT_AGE]: t('Некооректный возраст'),
        [ValidateProfileErrors.INCORRECT_COUNTRY]: t('Некооректный страна'),
        [ValidateProfileErrors.INCORRECT_USER_DATA]: t('Некооректное имя'),
        [ValidateProfileErrors.NO_DATA]: t('Нету данных'),
        [ValidateProfileErrors.SERVER_ERROR]: t('Серверная ошибка'),
    };

    const dispatch = useAppDispatch();
    useInitialEffect(() => {
        dispatch(fetchProfileData(id));
    }, [dispatch, id]);
    const reducers:ReducersList = {
        profile: profileReducers,
    };
    const onChangeFirstname = useCallback((value?:string) => {
        dispatch(profileActions.updateProfile({ first: value || '' }));
    }, [dispatch]);
    const onChangeLastname = useCallback((value?:string) => {
        dispatch(profileActions.updateProfile({ lastname: value || '' }));
    }, [dispatch]);
    const onChangeAge = useCallback((value:string) => {
        if (/^\d+$/.test(value)) {
            dispatch(profileActions.updateProfile({ age: Number(value || 0) }));
        } else {
            dispatch(profileActions.updateProfile({ age: 0 }));
        }
    }, [dispatch]);
    const onChangeCity = useCallback((value?:string) => {
        dispatch(profileActions.updateProfile({ city: value || '' }));
    }, [dispatch]);
    const onChangeUsername = useCallback((value?:string) => {
        dispatch(profileActions.updateProfile({ username: value || '' }));
    }, [dispatch]);
    const onChangeAvatar = useCallback((value?:string) => {
        dispatch(profileActions.updateProfile({ avatar: value || '' }));
    }, [dispatch]);
    const onChangeCurrency = useCallback((value?:Currency) => {
        dispatch(profileActions.updateProfile({ currency: value }));
    }, [dispatch]);
    const onChangeCountry = useCallback((value?:Country) => {
        dispatch(profileActions.updateProfile({ country: value }));
    }, [dispatch]);

    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
            <VStack max gap={8}>

                <EditableProfileCardHeader />
                {validateProfileErrors?.length && validateProfileErrors.map((err) => (
                    <Text
                        theme={TextTheme.ERROR}
                        text={validateErrorTranslation[err]}
                        key={validateErrorTranslation[err]}
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
                    data={formData}
                    isLoading={isLoading}
                    error={error}
                    readonly={readonly}
                />
            </VStack>
        </DynamicModuleLoader>

    );
};
