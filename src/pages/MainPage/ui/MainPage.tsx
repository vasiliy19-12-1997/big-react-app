import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Page } from '@/shared/ui/deprecated/Page';
import { Counter } from '@/entities/Counter';

const MainPage = memo(() => {
    const { t } = useTranslation();
    return (
        <Page data-testid="MainPage">
            {t('Главная страница')}
            <div>000123</div>
            <Counter />
        </Page>
    );
});

export default MainPage;
