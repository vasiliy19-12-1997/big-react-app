import { ArtcileDetails } from 'entities/Article';
import { CommentaryList } from 'entities/Сommentary';
import { AddCommentForm } from 'features/AddCommentForm';
import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect';
import { Text } from 'shared/ui/Text/Text';
import { Button } from 'shared/ui/Button/Button';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { articleDetailsCommentsReducer, getArticleComments } from '../../model/slice/ArticleDetailsCommentSlice';
import { fetchCommentsByArticleId } from '../../model/services/fetchCommentsByArticleId';
import { addCommentForArticle } from '../../model/services/addCommentForArticle';
import { getArticleDetailsCommentsError, getArticleDetailsCommentsIsLoading } from '../../model/selectors/comments';
import cls from './ArticlePageDetails.module.scss';

const ArticlePageDetails = memo(() => {
    const { t } = useTranslation('ArticlePageDetails');
    const { id } = useParams<{id?:string}>();
    const isLoading = useSelector(getArticleDetailsCommentsIsLoading);
    console.log(`isLoading${isLoading}`);
    const error = useSelector(getArticleDetailsCommentsError);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const reducers:ReducersList = {
        articleDetailsComments: articleDetailsCommentsReducer,
    };
    const comments = useSelector(getArticleComments.selectAll);
    useInitialEffect(() => {
        dispatch(fetchCommentsByArticleId(id));
    });
    const onSendComments = useCallback((text:string) => {
        dispatch(addCommentForArticle(text));
    }, [dispatch]);

    const onBackToList = useCallback(() => {
        navigate(RoutePath.articles);
    }, [navigate]);
    if (!id) {
        return (
            <div>
                {t('Статья не найдена')}
            </div>
        );
    }

    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
            <div>
                {t('Article Page Details')}
                <Button onClick={onBackToList} className={cls.btnBack}>{t('Вернуться назад')}</Button>
                <ArtcileDetails id={id} />
                <Text title={t('Комментарии')} className={cls.comments} />
                <AddCommentForm onSendComments={onSendComments} />
                <CommentaryList isLoading={isLoading} comments={comments} />
            </div>
        </DynamicModuleLoader>
    );
});

export default ArticlePageDetails;
