import { memo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './StarRating.module.scss';
import { Icon as IconDeprecated } from '../Icon/Icon';
import StarSvg from '@/shared/assets/icons/star.svg';
import { toggleFeatures, ToggleFeatures } from '@/shared/features';
import { Icon } from '../../redesigned/Icon';

interface StarRatingProps {
    className?: string;
    size?: number;
    selectedStars?: number;
    onSelect?: (stars: number) => void;
}
const stars = [1, 2, 3, 4, 5];
/**
 * Компонент устарел, пожалуйста используйте ui библиотеку из папки redesign
 * @deprecated
 */
export const StarRating = memo((props: StarRatingProps) => {
    const { t } = useTranslation();
    const { className, size = 50, selectedStars = 0, onSelect } = props;
    const [currentStarsCount, setCurrentStarsCount] = useState(selectedStars);
    const [isSelected, setIsSelected] = useState(Boolean(selectedStars));

    const onHover = (starCount: number) => () => {
        if (!isSelected) {
            setCurrentStarsCount(starCount);
        }
    };
    const onClick = (starCount: number) => () => {
        if (!isSelected) {
            onSelect?.(starCount);
            setIsSelected(true);
        }
        setIsSelected(false);
    };

    const onLeave = () => {
        if (!isSelected) {
            setCurrentStarsCount(0);
        }
    };
    return (
        <div
            className={classNames(
                toggleFeatures({
                    name: 'isNewDesignEnabled',
                    on: () => cls.StarRatingRedesign,
                    off: () => cls.StarRating,
                }),
                {},
                [className],
            )}
        >
            {stars.map((starNumber, index) => {
                const sharedProps = {
                    'data-testid': `StarRating.${starNumber}`,
                    key: starNumber,
                    className: classNames(cls.starIcon, { [cls.selected]: isSelected }, [
                        currentStarsCount >= starNumber ? cls.hovered : cls.normal,
                    ]),
                    width: size,
                    Svg: StarSvg,
                    height: size,
                    onMouseLeave: onLeave,
                    onMouseEnter: onHover(starNumber),
                    onClick: onClick(starNumber),
                    'data-selected': isSelected && currentStarsCount >= starNumber,
                };
                return (
                    <ToggleFeatures
                        name="isNewDesignEnabled"
                        on={<Icon clickable={!isSelected} {...sharedProps} />}
                        off={<IconDeprecated {...sharedProps} />}
                    />
                );
            })}
        </div>
    );
});
