import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getAuthUserData } from '@/entities/User';
import { getArticleDetailsData } from '@/entities/Article';
import { RoutePath } from '@/shared/const/router';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Button } from '@/shared/ui/Button/Button';
import { getCanEditArticles } from '../../model/selectors/articles/articles';
import cls from './ArticlePageDetailsHeader.module.scss';

interface ArticlePageDetailsHeaderProps {
  className?: string;
}

export const ArticlePageDetailsHeader = memo((props: ArticlePageDetailsHeaderProps) => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const articles = useSelector(getArticleDetailsData);
    const userData = useSelector(getAuthUserData);
    const canEdit = useSelector(getCanEditArticles);
    const { className } = props;
    const onBackToList = useCallback(() => {
        navigate(RoutePath.articles);
    }, [navigate]);
    const onEditArticle = useCallback(() => {
        navigate(`${RoutePath.article_details}${articles?.id}/edit`);
    }, [articles?.id, navigate]);

    return (
        <div className={classNames(cls.ArticlePageDetailsHeader, {}, [className])}>
            <Button onClick={onBackToList} className={cls.btnBack}>{t('Вернуться назад')}</Button>
            {canEdit && <Button onClick={onEditArticle} className={cls.editBtn}>{t('Редактивовать')}</Button>}
        </div>
    );
});
