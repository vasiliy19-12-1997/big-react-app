import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Page } from '@/shared/ui/Page';
import { Counter } from '@/entities/Counter';

const MainPage = memo(() => {
    const { t } = useTranslation();
    return (
        <Page>
            {t('Главная страница')}
            <Counter />
        </Page>
    );
});

export default MainPage;
