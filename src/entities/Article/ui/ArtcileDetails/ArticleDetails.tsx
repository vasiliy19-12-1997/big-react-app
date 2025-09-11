import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import CalendarIcon from 'shared/assets/icons/calendar-20-20.svg';
import EyeIcon from 'shared/assets/icons/eye-20-20.svg';
import { classNames } from 'shared/lib/classNames/classNames';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect';
import { Avatar } from 'shared/ui/Avatar/Avatar';
import { Icon } from 'shared/ui/Icon/Icon';
import { Sceleton } from 'shared/ui/Sceleton/Sceleton';
import { HStack } from 'shared/ui/Stack';
import { Text, TextAlign, TextSize } from '../../../../shared/ui/Text/Text';
import { getArticleDetailsData, getArticleDetailsError, getArticleDetailsIsLoading } from '../../model/selectors/getArticleDetails';
import { fetchArticleById } from '../../model/services/fetchArticleById';
import { articleDetailsReducers } from '../../model/slice/artcileDetailsSlice';
import { ArtcileTypeBlocks, ArticleBlockType } from '../../model/types/artcile';
import { ArtcileCodeBlockComponent } from '../ArtcileCodeBlockComponent/ArtcileCodeBlockComponent';
import { ArtcileImageBlockComponent } from '../ArtcileImageBlockComponent/ArtcileImageBlockComponent';
import { ArtcileTextBlockComponent } from '../ArtcileTextBlockComponent/ArtcileTextBlockComponent';
import cls from './ArtcileDetails.module.scss';

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
    const isLoading = useSelector(getArticleDetailsIsLoading);
    const article = useSelector(getArticleDetailsData);
    const renderBlocks = useCallback((blocks:ArtcileTypeBlocks) => {
        switch (blocks.type) {
        case ArticleBlockType.TEXT:
            return (<ArtcileTextBlockComponent key={blocks.id} className={cls.block} block={blocks} />);
        case ArticleBlockType.CODE:
            return (<ArtcileCodeBlockComponent key={blocks.id} block={blocks} className={cls.block} />);
        case ArticleBlockType.IMAGE:
            return (<ArtcileImageBlockComponent key={blocks.id} block={blocks} className={cls.block} />);
        default:
            return null;
        }
    }, []);
    useInitialEffect(() => {
        dispatch(fetchArticleById(id));
    }, [dispatch, id]);
    let element;

    if (error) {
        element = (
            <Text align={TextAlign.CENTER} title={t('Произошла ошибка при загрузке статьи')} />
        );
    } else if (isLoading) {
        element = (
            <>
                <Sceleton className={cls.avatar} width={200} height={200} border="50%" />
                <Sceleton className={cls.title} width={300} height={32} />
                <Sceleton className={cls.title} width={600} height={24} />
                <Sceleton className={cls.sceleton} width="100%" height={200} />
                <Sceleton className={cls.sceleton} width="100%" height={200} />
            </>
        );
    } else {
        element = (
            <>
                <HStack max className={cls.avatarWrapper}>
                    <Avatar src={article?.img} className={cls.avatar} />
                </HStack>
                <Text size={TextSize.L} title={article?.title} />
                <Text size={TextSize.L} text={article?.subtitle} />

                <HStack justify="start">
                    <Icon Svg={EyeIcon} className={cls.icon} />
                    <Text text={String(article?.views)} />
                </HStack>
                <HStack justify="start">
                    <Icon Svg={CalendarIcon} className={cls.icon} />
                    <Text text={String(article?.createdAt)} />
                </HStack>
                {article?.blocks.map(renderBlocks)}
            </>
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
