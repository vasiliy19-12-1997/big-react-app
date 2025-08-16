import {
    profileReducers,
} from 'features/EditableProfileCard';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';

import { EditableProfileCard } from 'features/EditableProfileCard/ui/EditableProfileCard/EditableProfileCard';
import { Page } from 'shared/ui/Page/Page';
import { ProfilePageHeader } from './ProfilePageHeader/ProfilePageHeader';

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
            <Page className={classNames('', {}, [className])}>
                <ProfilePageHeader />
                <EditableProfileCard />
            </Page>
        </DynamicModuleLoader>
    );
});

export default ProfilePage;
