import { memo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { RatingCard } from '@/entities/Rating';
import { Page } from '@/widgets/Page/Page';

const MainPage = memo(() => {
    const { t } = useTranslation();
    const [value, setValue] = useState('');
    const onChange = (val:string) => {
        setValue(val);
    };
    return (
        <Page>
            {t('Главная страница')}
            <RatingCard title={t('Рейтинг статьи')} feedbackTitle={t('feedback')} />
        </Page>
    );
});

export default MainPage;
