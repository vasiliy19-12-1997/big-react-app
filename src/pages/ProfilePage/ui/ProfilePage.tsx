import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { profileReducers } from 'entities/Profile';

const reducers:ReducersList = {
    profile: profileReducers,
};
interface ProfilePageProps {
  className?: string;
}

const ProfilePage = memo((props: ProfilePageProps) => {
    const { t } = useTranslation();
    const {
        className,
    } = props;
    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
            <div className={classNames('', {}, [className])}>{t('Profile page')}</div>
        </DynamicModuleLoader>
    );
});

export default ProfilePage;
