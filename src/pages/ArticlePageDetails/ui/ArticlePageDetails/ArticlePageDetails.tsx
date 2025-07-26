import { ArtcileDetails } from 'entities/Article';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

const ArticlePageDetails = memo(() => {
    const { t } = useTranslation('ArticlePageDetails');
    const { id } = useParams<{id?:string}>();
    if (!id) {
        return (
            <div>
                {t('Статья не найдена')}

            </div>
        );
    }
    return (
        <div>
            {t('Article Page Details')}
            <ArtcileDetails id={id} />
        </div>
    );
});

export default ArticlePageDetails;
