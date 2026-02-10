import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import CalendarIcon from '@/shared/assets/icons/calendar-20-20.svg';
import EyeIcon from '@/shared/assets/icons/eye-20-20.svg';
import { classNames } from '@/shared/lib/classNames/classNames';
import { DynamicModuleLoader, ReducersList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect';
import { Avatar as AvatarDeprecated } from '@/shared/ui/deprecated/Avatar';
import { Icon as IconDeprecated } from '@/shared/ui/deprecated/Icon';
import { Sceleton, Sceleton as SceletonDeprecated } from '@/shared/ui/deprecated/Sceleton';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { Text as TextDeprecated, TextAlign, TextSize } from '../../../../shared/ui/deprecated/Text/Text';
import {
    getArticleDetailsData,
    getArticleDetailsError,
    getArticleDetailsIsLoading,
} from '../../model/selectors/getArticleDetails';
import { fetchArticleById } from '../../model/services/fetchArticleById';
import { articleDetailsReducers } from '../../testing';
import cls from './ArtcileDetails.module.scss';
import { renderBlocks } from './ArticleRenderBlock';
import { ToggleFeatures } from '@/shared/features';
import { Text } from '@/shared/ui/redesigned/Text';
import { Icon } from '@/shared/ui/redesigned/Icon';
import { Avatar } from '@/shared/ui/redesigned/Avatar';
import { AppImage } from '@/shared/ui/redesigned/AppImage';

interface ArtcileDetailsProps {
    className?: string;
    id?: string;
}

export const ArtcileDetails = memo((props: ArtcileDetailsProps) => {
    const { t } = useTranslation();
    const { className, id = '1' } = props;
    const reducers: ReducersList = {
        articlesDetails: articleDetailsReducers,
    };
    const dispatch = useAppDispatch();
    const error = useSelector(getArticleDetailsError);
    const isLoading = useSelector(getArticleDetailsIsLoading);
    const article = useSelector(getArticleDetailsData);

    useInitialEffect(() => {
        dispatch(fetchArticleById(id));
    }, [dispatch, id]);
    let element;

    // eslint-disable-next-line react/no-unstable-nested-components
    const Deprecated = () => {
        return (
            <>
                <HStack max className={cls.avatarWrapper}>
                    <AvatarDeprecated src={article?.img} className={cls.avatar} />
                </HStack>
                <TextDeprecated size={TextSize.L} title={article?.title} />
                <TextDeprecated size={TextSize.L} text={article?.subtitle} />
                <HStack justify="start" data-testid="ArticleDetails.Info">
                    <IconDeprecated Svg={EyeIcon} className={cls.icon} />
                    <TextDeprecated text={String(article?.views)} />
                </HStack>
                <HStack justify="start">
                    <IconDeprecated Svg={CalendarIcon} className={cls.icon} />
                    <TextDeprecated text={String(article?.createdAt)} />
                </HStack>
                {/* TODO найти текст с кодом, чтобы отобразить */}
                {article?.blocks?.map(renderBlocks)}
            </>
        );
    };
    // eslint-disable-next-line react/no-unstable-nested-components
    const Redesigned = () => {
        return (
            <>
                <Text size="l" title={article?.title} bold />
                <Text size="l" text={article?.subtitle} />
                <AppImage className={cls.img} fallback={<Sceleton />} src={article?.img} height={420} width={100} />

                <HStack justify="start" data-testid="ArticleDetails.Info">
                    <Icon Svg={EyeIcon} className={cls.icon} />
                    <Text text={String(article?.views)} />
                </HStack>
                <HStack justify="start">
                    <Icon Svg={CalendarIcon} className={cls.icon} />
                    <Text text={String(article?.createdAt)} />
                </HStack>
                {article?.blocks?.map(renderBlocks)}
            </>
        );
    };
    if (error) {
        element = <Text align={TextAlign.CENTER} title={t('Произошла ошибка при загрузке статьи')} />;
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
        element = <ToggleFeatures name="isNewDesignEnabled" on={<Redesigned />} off={<Deprecated />} />;
    }
    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
            <VStack gap={16} max className={classNames(cls.ArtcileDetails, {}, [className])}>
                {element}
            </VStack>
        </DynamicModuleLoader>
    );
});
