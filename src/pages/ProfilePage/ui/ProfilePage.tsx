import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import {
    EditableProfileCard,
} from '@/features/EditableProfileCard';
import { classNames } from '@/shared/lib/classNames/classNames';
import { VStack } from '@/shared/ui/Stack';
import { Page } from '@/widgets/Page';
import cls from './ProfilePage.module.scss';

interface ProfilePageProps {
  className?: string;
}

export const ProfilePage = memo((props: ProfilePageProps) => {
    const { t } = useTranslation();
    const { id } = useParams<{id:string}>();
    if (!id) {
        return null;
    }
    const {
        className,
    } = props;
    return (
        <Page className={classNames(cls.ProfilePage, {}, [className])}>
            <VStack gap={16} max>
                <EditableProfileCard id={id} />
            </VStack>
        </Page>
    );
});
