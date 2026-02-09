import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Card } from '@/shared/ui/redesigned/Card';
import { ArticlesAdditionalInfo } from '@/widgets/ArticlesAdditionalInfo';
import { getArticleDetailsData } from '@/entities/Article';
import cls from './AdditionalInfoContainer.module.scss';
import { getRouteArticleEdit } from '@/shared/const/router';

export const AdditionalInfoContainer = memo(() => {
    const { t } = useTranslation();
    const artilceData = useSelector(getArticleDetailsData);
    const navigate = useNavigate();

    const onEditArticle = useCallback(() => {
        navigate(getRouteArticleEdit(artilceData?.id || ''));
    }, [artilceData?.id, navigate]);

    if (!artilceData) {
        return null;
    }
    return (
        <Card className={cls.card} padding="24" border="round">
            <ArticlesAdditionalInfo
                onEdit={onEditArticle}
                author={artilceData?.user}
                createdAt={artilceData.createdAt}
                views={artilceData.views}
            />
        </Card>
    );
});
