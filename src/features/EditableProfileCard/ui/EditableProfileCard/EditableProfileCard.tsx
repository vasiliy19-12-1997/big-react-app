import { Country } from 'entities/Country';
import { Currency } from 'entities/Currency';
import { fetchProfileData, profileActions, ProfileCard } from 'entities/Profile';
import { getProfileError } from 'features/EditableProfileCard/model/selectors/getProfileError/getProfileError';
import { getProfileForm } from 'features/EditableProfileCard/model/selectors/getProfileForm/getProfileForm';
import { getProfileIsLoading } from
    'features/EditableProfileCard/model/selectors/getProfileIsLoading/getProfileIsLoading';
import { getProfileReadonly } from 'features/EditableProfileCard/model/selectors/getProfileReadonly/getProfileReadonly';
import { useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';

interface EditableProfileCardProps {
  className?: string;
}

export const EditableProfileCard = (props: EditableProfileCardProps) => {
    const { t } = useTranslation();
    const formData = useSelector(getProfileForm);
    const isLoading = useSelector(getProfileIsLoading);
    const error = useSelector(getProfileError);
    const readonly = useSelector(getProfileReadonly);
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(fetchProfileData());
    }, [dispatch]);
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
    const {
        className,
    } = props;
    return (
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

    );
};
