import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Page } from '@/shared/ui/Page';

const AdminPanelPage = memo(() => {
    const { t } = useTranslation();
    return <Page data-testid="AdminPanelPage">{t('AdminPanelPage')}</Page>;
});

export default AdminPanelPage;
