import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { DynamicModuleLoader, ReducersList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Page } from '@/shared/ui/Page';
import { fetchNextArticlePage } from '../../model/services/fetchNextArticlePage/fetchNextArticlePage';
import { articlesReducer } from '../../model/slice/articlePageSlice';
import { ArticleInfiniteList } from '../ArticleInfiniteList/ArticleInfiniteList';
import { ArticlePageFilter } from '../ArticlePageFilter/ArticlePageFilter';
import cls from './ArticlePage.module.scss';

const ArticlePage = memo(() => {
    const { t } = useTranslation('ArticlePage');
    const dispatch = useAppDispatch();
    const reducers:ReducersList = {
        articlePage: articlesReducer,
    };

    const onNextLoad = useCallback(() => {
        dispatch(fetchNextArticlePage());
    }, [dispatch]);

    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount={false}>
            <Page data-testid="ArticlePage" onScrollEnd={onNextLoad}>
                {t('Article Page')}
                <ArticlePageFilter />
                <ArticleInfiniteList className={cls.list} />
            </Page>
        </DynamicModuleLoader>
    );
});

export default ArticlePage;
