import { ArtcileDetails } from 'entities/Article';
import { CommentaryList } from 'entities/Сommentary';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { Text } from 'shared/ui/Text/Text';
import cls from './ArticlePageDetails.module.scss';
import { IsLoading } from '../../../../entities/Article/ui/ArtcileDetails/ArtcileDetails.stories';

const ArticlePageDetails = memo(() => {
    const { t } = useTranslation('ArticlePageDetails');
    const { id } = useParams<{id?:string}>();
    const commentsArray = [{
        id: '1',
        text: 'some comment',
        user: {
            id: '1',
            username: 'vasya',
            // eslint-disable-next-line max-len
            avatar: 'https://image.api.playstation.com/vulcan/img/cfn/113079XRqKze-XG5C66saw2iu5NzZBKKc74WSsi37VWopNYI4BstfGjUdc7bn__iGGvgJjZXHFx7T4P7QHoYtiLVxlYgjFp_.png?w=440&thumb=false',
        },
    },
    {
        id: '2',
        text: 'some comment2',
        user: {
            id: '2',
            username: 'vasya2',
            // eslint-disable-next-line max-len
            avatar: 'https://image.api.playstation.com/vulcan/img/cfn/113079XRqKze-XG5C66saw2iu5NzZBKKc74WSsi37VWopNYI4BstfGjUdc7bn__iGGvgJjZXHFx7T4P7QHoYtiLVxlYgjFp_.png?w=440&thumb=false',
        },

    },
    ];
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
            <Text title={t('Комментарии')} className={cls.comments} />
            <CommentaryList IsLoading={false} comments={commentsArray} />
        </div>
    );
});

export default ArticlePageDetails;
