import {
    Article,
    ArticleViews,
} from 'entities/Article/model/types/artcile';
import { memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { Card } from 'shared/ui/Card/Card';
import { Sceleton } from 'shared/ui/Sceleton/Sceleton';
import { Text } from 'shared/ui/Text/Text';
import cls from './ArticleListItem.module.scss';

interface ArticleListItemSceletonProps {
  className?: string;
  view:ArticleViews
}

export const ArticleListItemSceleton = memo((props: ArticleListItemSceletonProps) => {
    const { className, view } = props;
    if (view === ArticleViews.BIG) {
        return (
            <div className={classNames(cls.ArticleListItem, {}, [className, cls[view]])}>
                <div className={cls.header}>
                    <Sceleton height={50} width={50} border="50%" className={cls.avatar} />
                    <Sceleton width={300} height={50} className={cls.username} />
                    <Sceleton width={50} height={50} className={cls.createdAt} />
                </div>
                <Sceleton width={300} height={30} className={cls.title} />
                <Sceleton width="100%" height={300} className={cls.img} />
                <div className={cls.footer}>
                    <Sceleton width="100%" height={30} className={cls.footerBtn} />
                </div>
            </div>
        );
    }
    return (
    // @ts-ignore
        <div className={classNames(cls.ArticleListItem, {}, [className, cls[view]])}>
            <Card>
                <div className={cls.imageWrapper}>
                    <Sceleton className={cls.img} width={200} height={200} />
                </div>
                <Sceleton className={cls.textWrapper} />
            </Card>
        </div>
    );
});
