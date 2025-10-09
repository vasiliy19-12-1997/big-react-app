import { classNames } from '@/shared/lib/classNames/classNames';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import ListIcon from '@/shared/assets/icons/list-24-24.svg';
import TiledIcon from '@/shared/assets/icons/tiled-24-24.svg';
import { ArticleViews } from '@/entities/Article';
import { Button } from '@/shared/ui/Button/Button';
import { Icon } from '@/shared/ui/Icon/Icon';
import cls from './ArticleViewSelector.module.scss';

interface ArticleViewSelectorProps {
  className?: string;
  view:ArticleViews | undefined
  onViewClick:(view:ArticleViews)=>void
}

export const ArticleViewSelector = memo((props: ArticleViewSelectorProps) => {
    const { t } = useTranslation();

    const { className, view, onViewClick } = props;
    const viewTypes = [
        {
            view: ArticleViews.SMALL,
            icon: ListIcon,
        },
        {
            view: ArticleViews.BIG,
            icon: TiledIcon,
        },
    ];
    const onClick = (newView:ArticleViews) => () => {
        onViewClick?.(newView);
    };
    return (
        <div className={classNames(cls.ArticleViewSelector, {}, [className])}>
            {viewTypes.map((item, index) => (
                <Button key={index} onClick={onClick(item.view)}>
                    <Icon Svg={item.icon} className={classNames('', { [cls.notSelected]: item.view !== view })} />
                </Button>
            ))}
        </div>
    );
});
