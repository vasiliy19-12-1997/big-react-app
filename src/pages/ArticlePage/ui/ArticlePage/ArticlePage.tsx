import { memo } from 'react';
import { useTranslation } from 'react-i18next';

const ArticlePage = memo(() => {
    const { t } = useTranslation('ArticlePage');
    return (
        <div>
            {t('Article Page')}
        </div>
    );
});

export default ArticlePage;
