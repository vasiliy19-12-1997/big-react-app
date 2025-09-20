import {
    EditableProfileCard,
} from 'features/EditableProfileCard';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { VStack } from 'shared/ui/Stack';
import { Page } from 'widgets/Page/Page';
import { useParams } from 'react-router-dom';
import { Text } from 'shared/ui/Text/Text';

interface ProfilePageProps {
  className?: string;
}

export const ProfilePage = memo((props: ProfilePageProps) => {
    const { t } = useTranslation();
    const { id } = useParams<{id:string}>();
    const {
        className,
    } = props;
    if (!id) {
        return <Text text={t('Профиль не найден')} />;
    }
    return (
        <Page className={classNames('', {}, [className])}>
            <VStack gap={16} max>
                <EditableProfileCard id={id} />
            </VStack>

        </Page>
    );
});
