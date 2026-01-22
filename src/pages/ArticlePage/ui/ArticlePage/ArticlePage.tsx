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
import { useArticleitemById } from '../../model/selectors/articles';
import { ArticlePageGreeting } from '@/features/articlePageGreeting';
import { useJsonSettings } from '@/entities/User';

const ArticlePage = memo(() => {
    const { t } = useTranslation('ArticlePage');
    const dispatch = useAppDispatch();
    const reducers: ReducersList = {
        articlePage: articlesReducer,
    };

    const onNextLoad = useCallback(() => {
        dispatch(fetchNextArticlePage());
    }, [dispatch]);
    const { theme } = useJsonSettings();
    console.log(theme);
    const testArticleData = useArticleitemById('10');

    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount={false}>
            <Page data-testid="ArticlePage" onScrollEnd={onNextLoad}>
                {t('Article Page')}
                <ArticlePageFilter />
                <ArticlePageGreeting />
                <ArticleInfiniteList className={cls.list} />
            </Page>
        </DynamicModuleLoader>
    );
});

export default ArticlePage;
