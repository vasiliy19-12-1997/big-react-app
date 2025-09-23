import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Page } from 'widgets/Page/Page';

const ForbiddenPage = memo(() => {
    const { t } = useTranslation();
    return (
        <Page>
            {t('ForbiddenPage')}
            <div>111</div>
            <div>111</div>
        </Page>
    );
});

export default ForbiddenPage;
