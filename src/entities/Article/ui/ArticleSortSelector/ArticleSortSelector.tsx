import { memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import { SortOrder } from '@/shared/types';
import { Select, SelectOptions } from '@/shared/ui/Select';
import { ArticleSortField } from '../../model/types/artcile';
import cls from './ArticleSortSelector.module.scss';

interface ArticleSortSelectorProps {
  className?: string;
  sort:ArticleSortField,
  order:SortOrder,
  onChangeOrder:(newOrder:SortOrder)=>void,
  onChangeSort:(newSort:ArticleSortField)=>void
}

export const ArticleSortSelector = memo((props: ArticleSortSelectorProps) => {
    const { t } = useTranslation();
    const {
        className, sort, order, onChangeOrder, onChangeSort,
    } = props;
    const selectOptions = useMemo<SelectOptions<SortOrder>[]>(() => [
        {
            value: 'asc',
            content: t('возрастанию'),
        },
        {
            value: 'desc',
            content: t('убыванию'),
        },
    ], [t]);
    const sortFieldOptions = useMemo<SelectOptions<ArticleSortField>[]>(() => [
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

    ], [t]);

    return (
        <div className={classNames(cls.ArticleSortSelector, {}, [className])}>
            <Select
                onChange={onChangeSort}
                value={sort}
                options={sortFieldOptions}
                label={t('Сортировка по')}
            />
            <Select
                value={order}
                onChange={onChangeOrder}
                options={selectOptions}
                label={t('Сортировка по')}
                className={cls.order}
            />

        </div>
    );
});
