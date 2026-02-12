import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { getAuthUserData } from '@/entities/User';
import { classNames } from '@/shared/lib/classNames/classNames';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Button as ButtonDeprecated, ButtonTheme } from '@/shared/ui/deprecated/Button';
import { Text as TextDeprecated } from '@/shared/ui/deprecated/Text';
import { getProfileData } from '../../model/selectors/getProfileData/getProfileData';
import { getProfileReadonly } from '../../model/selectors/getProfileReadonly/getProfileReadonly';
import { updateProfileData } from '../../model/services/updateProfileData/updateProfileData';
import { profileActions } from '../../model/slice/profileSlice';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { ToggleFeatures } from '@/shared/features';
import { Button } from '@/shared/ui/redesigned/Button';
import { Text } from '@/shared/ui/redesigned/Text';
import { Card } from '@/shared/ui/redesigned/Card';

interface EditableProfileCardHeaderProps {
    className?: string;
}

export const EditableProfileCardHeader = memo((props: EditableProfileCardHeaderProps) => {
    const { t } = useTranslation();
    const readonly = useSelector(getProfileReadonly);
    const authData = useSelector(getAuthUserData);
    const profileData = useSelector(getProfileData);
    const canEdit = authData?.id === profileData?.id;
    const dispatch = useAppDispatch();
    const { className } = props;

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
        <ToggleFeatures
            name="isNewDesignEnabled"
            on={
                <Card className={classNames('', {}, [className])} border="partial_round" padding="24" max>
                    <HStack max justify="between">
                        <Text title={t('Профиль пользователя')} />
                        {canEdit && (
                            <div>
                                {readonly ? (
                                    <Button
                                        variant="outline"
                                        onClick={onEdit}
                                        data-testid="EditableProfileCardHeader.Edit"
                                    >
                                        {t('Редактировать')}
                                    </Button>
                                ) : (
                                    <HStack max justify="between">
                                        <Button
                                            color="error"
                                            variant="outline"
                                            onClick={onCancellEdit}
                                            data-testid="EditableProfileCardHeader.Cancel"
                                        >
                                            {t('Отменить')}
                                        </Button>
                                        <Button
                                            variant="outline"
                                            color="succes"
                                            onClick={onSave}
                                            data-testid="EditableProfileCardHeader.Save"
                                        >
                                            {t('Сохранить')}
                                        </Button>
                                    </HStack>
                                )}
                            </div>
                        )}
                    </HStack>
                </Card>
            }
            off={
                <VStack max className={classNames('', {}, [className])}>
                    <TextDeprecated title={t('Профиль пользователя')} />

                    {canEdit && (
                        <HStack max gap={8} justify="between">
                            {readonly ? (
                                <ButtonDeprecated
                                    theme={ButtonTheme.OUTLINE}
                                    onClick={onEdit}
                                    data-testid="EditableProfileCardHeader.Edit"
                                >
                                    {t('Редактировать')}
                                </ButtonDeprecated>
                            ) : (
                                <>
                                    <ButtonDeprecated
                                        theme={ButtonTheme.OUTLINE_RED}
                                        onClick={onCancellEdit}
                                        data-testid="EditableProfileCardHeader.Cancel"
                                    >
                                        {t('Отменить')}
                                    </ButtonDeprecated>
                                    <ButtonDeprecated
                                        theme={ButtonTheme.OUTLINE}
                                        onClick={onSave}
                                        data-testid="EditableProfileCardHeader.Save"
                                    >
                                        {t('Сохранить')}
                                    </ButtonDeprecated>
                                </>
                            )}
                        </HStack>
                    )}
                </VStack>
            }
        />
    );
});
