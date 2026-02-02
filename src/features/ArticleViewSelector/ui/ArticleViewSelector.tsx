import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import ListIcon from '@/shared/assets/icons/burger.svg';
import TiledIcon from '@/shared/assets/icons/tile.svg';
import ListIconDeprecated from '@/shared/assets/icons/list-24-24.svg';
import TiledIconDeprecated from '@/shared/assets/icons/tiled-24-24.svg';
import { ArticleViews } from '@/entities/Article';
import { Button as ButtonDeprecated } from '@/shared/ui/deprecated/Button';
import { Icon as IconDeprecated } from '@/shared/ui/deprecated/Icon';
import cls from './ArticleViewSelector.module.scss';
import { ToggleFeatures, toggleFeatures } from '@/shared/features';
import { Icon } from '@/shared/ui/redesigned/Icon';
import { Card } from '@/shared/ui/redesigned/Card';
import { HStack } from '@/shared/ui/redesigned/Stack';

interface ArticleViewSelectorProps {
    className?: string;
    view: ArticleViews | undefined;
    onViewClick: (view: ArticleViews) => void;
}

export const ArticleViewSelector = memo((props: ArticleViewSelectorProps) => {
    const { t } = useTranslation();

    const { className, view, onViewClick } = props;
    const viewTypes = [
        {
            view: ArticleViews.SMALL,
            icon: toggleFeatures({
                name: 'isNewDesignEnabled',
                on: () => ListIcon,
                off: () => ListIconDeprecated,
            }),
        },
        {
            view: ArticleViews.BIG,
            icon: toggleFeatures({
                name: 'isNewDesignEnabled',
                on: () => TiledIcon,
                off: () => TiledIconDeprecated,
            }),
        },
    ];

    const onClick = (newView: ArticleViews) => () => {
        onViewClick?.(newView);
    };

    return (
        <ToggleFeatures
            name="isNewDesignEnabled"
            on={
                <Card border="round" className={classNames(cls.ArticleViewSelectorRedesign, {}, [className])}>
                    <HStack gap={8}>
                        {viewTypes.map((item, index) => (
                            <Icon
                                onClick={onClick(item.view)}
                                clickable
                                Svg={item.icon}
                                className={classNames('', { [cls.notSelected]: item.view !== view })}
                            />
                        ))}
                    </HStack>
                </Card>
            }
            off={
                <div className={classNames(cls.ArticleViewSelector, {}, [className])}>
                    {viewTypes.map((item, index) => (
                        <ButtonDeprecated key={index} onClick={onClick(item.view)}>
                            <IconDeprecated
                                width={24}
                                height={24}
                                Svg={item.icon}
                                className={classNames('', { [cls.notSelected]: item.view !== view })}
                            />
                        </ButtonDeprecated>
                    ))}
                </div>
            }
        />
    );
});
