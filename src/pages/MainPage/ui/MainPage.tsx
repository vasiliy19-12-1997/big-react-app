import { memo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { RatingCard } from '@/entities/Rating';
import { Page } from '@/widgets/Page';
import { Commentary, CommentaryList } from '@/entities/Сommentary';
import { ArticleDetailsComments } from '@/pages/ArticleDetailsComments';

const MainPage = memo(() => {
    const { t } = useTranslation();
    const [value, setValue] = useState('');
    const { id = '1' } = useParams<{id?:string}>();
    const onChange = (val:string) => {
        setValue(val);
    };

    return (
        <Page>
            {t('Главная страница')}
            <RatingCard title={t('Рейтинг статьи')} feedbackTitle={t('feedback')} />
            <ArticleDetailsComments id={id} />
        </Page>
    );
});

export default MainPage;
