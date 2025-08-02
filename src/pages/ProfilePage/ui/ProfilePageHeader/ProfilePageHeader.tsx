import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { classNames } from 'shared/lib/classNames/classNames';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { Text } from 'shared/ui/Text/Text';
import {
    getProfileData, getProfileReadonly, profileActions, updateProfileData,
} from 'features/EditableProfileCard';
import { getAuthUserData } from 'entities/User';
import cls from './ProfilePageHeader.module.scss';

interface ProfilePageHeaderProps {
  className?: string;
}

export const ProfilePageHeader = (props: ProfilePageHeaderProps) => {
    const { t } = useTranslation();
    const readonly = useSelector(getProfileReadonly);
    const authData = useSelector(getAuthUserData);
    const profileData = useSelector(getProfileData);
    const canEdit = authData?.id === profileData?.id;
    const dispatch = useAppDispatch();
    const {
        className,
    } = props;
    const onEdit = useCallback(() => {
        dispatch(profileActions.setReadonly(false));
    }, [dispatch]);
    const onCancellEdit = useCallback(() => {
        dispatch(profileActions.cancellEdit());
    }, [dispatch]);
    const onSave = useCallback(() => {
        dispatch(updateProfileData());
    }, [dispatch]);
    return (

        <div className={classNames(cls.ProfilePageHeader, {}, [className])}>
            <Text title={t('Профиль пользователя')} />
            {canEdit && (
                <div className={cls.btnsWrapper}>
                    {readonly ? (
                        <Button
                            className={cls.editBtn}
                            theme={ButtonTheme.OUTLINE}
                            onClick={onEdit}
                        >
                            {t('Редактировать')}
                        </Button>
                    ) : (
                        <>
                            <Button
                                className={cls.editBtn}
                                theme={ButtonTheme.OUTLINE_RED}
                                onClick={onCancellEdit}
                            >
                                {t('Отменить')}
                            </Button>
                            <Button
                                className={cls.editBtn}
                                theme={ButtonTheme.OUTLINE}
                                onClick={onSave}
                            >
                                {t('Сохранить')}
                            </Button>
                        </>
                    )}
                </div>
            )}

        </div>
    );
};
