import { ArtcileDetails } from 'entities/Article';
import { CommentaryList } from 'entities/Сommentary';
import { getArticleDetailsCommentsError, getArticleDetailsCommentsIsLoading } from 'pages/ArticlePageDetails/model/selectors/comments';
import { fetchCommentsByArticleId } from 'pages/ArticlePageDetails/model/services/fetchCommentsByArticleId';
import { articleDetailsCommentsReducer, getArticleComments } from 'pages/ArticlePageDetails/model/slice/ArticleDetailsCommentSlice';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect';
import { Text } from 'shared/ui/Text/Text';
import cls from './ArticlePageDetails.module.scss';

const ArticlePageDetails = memo(() => {
    const { t } = useTranslation('ArticlePageDetails');
    const { id } = useParams<{id?:string}>();
    const isLoading = useSelector(getArticleDetailsCommentsIsLoading);
    const error = useSelector(getArticleDetailsCommentsError);
    const dispatch = useDispatch();
    const reducers:ReducersList = {
        articleDetailsComments: articleDetailsCommentsReducer,
    };
    const comments = useSelector(getArticleComments.selectAll);
    useInitialEffect(() => {
        dispatch(fetchCommentsByArticleId(id));
    });
    // const commentsArray = [{
    //     id: '1',
    //     text: 'some comment',
    //     user: {
    //         id: '1',
    //         username: 'vasya',
    //         // eslint-disable-next-line max-len
    //         avatar: 'https://image.api.playstation.com/vulcan/img/cfn/113079XRqKze-XG5C66saw2iu5NzZBKKc74WSsi37VWopNYI4BstfGjUdc7bn__iGGvgJjZXHFx7T4P7QHoYtiLVxlYgjFp_.png?w=440&thumb=false',
    //     },
    // },
    // {
    //     id: '2',
    //     text: 'some comment2',
    //     user: {
    //         id: '2',
    //         username: 'vasya2',
    //         // eslint-disable-next-line max-len
    //         avatar: 'https://image.api.playstation.com/vulcan/img/cfn/113079XRqKze-XG5C66saw2iu5NzZBKKc74WSsi37VWopNYI4BstfGjUdc7bn__iGGvgJjZXHFx7T4P7QHoYtiLVxlYgjFp_.png?w=440&thumb=false',
    //     },

    // },
    // ];

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
                <ArtcileDetails id={id} />
                <Text title={t('Комментарии')} className={cls.comments} />
                <CommentaryList IsLoading={false} comments={comments} />
            </div>
        </DynamicModuleLoader>
    );
});

export default ArticlePageDetails;
