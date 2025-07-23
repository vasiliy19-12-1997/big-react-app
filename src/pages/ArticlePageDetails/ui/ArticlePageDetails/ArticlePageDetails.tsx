import { memo } from 'react';
import { useTranslation } from 'react-i18next';

const ArticlePageDetails = memo(() => {
    const { t } = useTranslation('ArticlePageDetails');
    return (
        <div>
            {t('Article Page Details')}
        </div>
    );
});

export default ArticlePageDetails;
