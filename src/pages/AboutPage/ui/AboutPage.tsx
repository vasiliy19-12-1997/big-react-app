import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Page } from '@/shared/ui/Page';

const AboutPage = memo(() => {
    const { t } = useTranslation('about');

    return (
        <Page>
            {t('О сайте')}
            <h1>fdfdfd</h1>
        </Page>
    );
});

export default AboutPage;
