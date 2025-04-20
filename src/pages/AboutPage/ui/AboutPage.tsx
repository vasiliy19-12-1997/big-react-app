import { useTranslation } from 'react-i18next';

const AboutPage = () => {
    const { t, i18n } = useTranslation('about');

    return (
        <div>
            <h1>{t('About page')}</h1>
        </div>
    );
};
export default AboutPage;
