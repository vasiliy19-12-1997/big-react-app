import { memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import { SortOrder } from '@/shared/types/sort';
import { Select as SelectDeprecated, SelectOptions } from '@/shared/ui/deprecated/Select';
import cls from './ArticleSortSelector.module.scss';
import { ArticleSortField } from '@/entities/Article';
import { ToggleFeatures } from '@/shared/features';
import { ListBox } from '@/shared/ui/redesigned/Popups';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';

interface ArticleSortSelectorProps {
    className?: string;
    sort: ArticleSortField;
    order: SortOrder;
    onChangeOrder: (newOrder: SortOrder) => void;
    onChangeSort: (newSort: ArticleSortField) => void;
}

export const ArticleSortSelector = memo((props: ArticleSortSelectorProps) => {
    const { t } = useTranslation();
    const { className, sort, order, onChangeOrder, onChangeSort } = props;
    const selectOptions = useMemo<SelectOptions<SortOrder>[]>(
        () => [
            {
                value: 'asc',
                content: t('возрастанию'),
            },
            {
                value: 'desc',
                content: t('убыванию'),
            },
        ],
        [t],
    );
    const sortFieldOptions = useMemo<SelectOptions<ArticleSortField>[]>(
        () => [
            {
                value: ArticleSortField.VIEWS,
                content: t('просмотрам'),
            },
            {
                value: ArticleSortField.CREATED,
                content: t('дате создания'),
            },
            {
                value: ArticleSortField.TITLE,
                content: t('названию'),
            },
        ],
        [t],
    );

    return (
        <ToggleFeatures
            name="isNewDesignEnabled"
            on={
                <div className={classNames(cls.ArticleSortSelectorRedesign, {}, [className])}>
                    <VStack gap={8}>
                        <Text text={t('Сортировать по')} />
                        <ListBox onChange={onChangeSort} value={sort} items={sortFieldOptions} />
                        <ListBox value={order} onChange={onChangeOrder} items={selectOptions} />
                    </VStack>
                </div>
            }
            off={
                <div className={classNames(cls.ArticleSortSelector, {}, [className])}>
                    <SelectDeprecated
                        onChange={onChangeSort}
                        value={sort}
                        options={sortFieldOptions}
                        label={t('Сортировка по')}
                    />
                    <SelectDeprecated
                        value={order}
                        onChange={onChangeOrder}
                        options={selectOptions}
                        label={t('Сортировка по')}
                        className={cls.order}
                    />
                </div>
            }
        />
    );
});
