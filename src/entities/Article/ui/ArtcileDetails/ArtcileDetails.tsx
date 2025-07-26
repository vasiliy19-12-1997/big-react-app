import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { articleDetailsReducers } from 'entities/Article/model/slice/artcileDetailsSlice';
import { memo, useEffect } from 'react';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { fetchArticleById } from 'entities/Article/model/services/fetchArticleById';
import { useSelector } from 'react-redux';
import { getArticleDetailsData, getArticleDetailsError, getArticleDetailsIsLoading } from
    'entities/Article/model/selectors/getArticleDetails';
import { Loader } from 'shared/ui/Loader/Loader';
import { Sceleton } from 'shared/ui/Sceleton/Sceleton';
import cls from './ArtcileDetails.module.scss';
import { Text, TextAlign } from '../../../../shared/ui/Text/Text';

interface ArtcileDetailsProps {
  className?: string;
  id?:string
}

export const ArtcileDetails = memo((props: ArtcileDetailsProps) => {
    const { t } = useTranslation();
    const { className, id = '' } = props;
    const reducers:ReducersList = {
        articles: articleDetailsReducers,
    };
    const dispatch = useAppDispatch();
    const error = useSelector(getArticleDetailsError);
    // const isLoading = useSelector(getArticleDetailsIsLoading);
    const isLoading = true;
    const data = useSelector(getArticleDetailsData);

    useEffect(() => {
        dispatch(fetchArticleById(id));
    }, [dispatch, id]);
    let element;
    if (error) {
        element = (

            <Text align={TextAlign.CENTER} title={t('Произошла ошибка при загрузке статьи')} />
        );
    } else if (isLoading) {
        element = (
            <div>
                <Sceleton className={cls.avatar} width={200} height={200} border="50%" />
                <Sceleton className={cls.title} width={300} height={32} />
                <Sceleton className={cls.title} width={600} height={24} />
                <Sceleton className={cls.sceleton} width="100%" height={200} />
                <Sceleton className={cls.sceleton} width="100%" height={200} />
            </div>
        );
    } else {
        element = (

            <div>{t('Article Details')}</div>
        );
    }
    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
            <div className={classNames(cls.ArtcileDetails, {}, [className])}>
                {element}
            </div>
        </DynamicModuleLoader>
    );
});
