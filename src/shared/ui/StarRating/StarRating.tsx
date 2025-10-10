import { memo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './StarRating.module.scss';
import { Icon } from '../Icon/Icon';
import StarSvg from '../../assets/icons/star.svg';

interface StarRatingProps {
  className?: string;
  size?:number
  selectedStars?:number
  onSelect?:(stars:number)=>void
}
const stars = [1, 2, 3, 4, 5];
export const StarRating = memo((props: StarRatingProps) => {
    const { t } = useTranslation();
    const {
        className, size = 50, selectedStars = 0, onSelect,
    } = props;
    const [currentStarsCount, setCurrentStarsCount] = useState(0);
    const [isSelected, setIsSelected] = useState(Boolean(selectedStars));
    const onHover = (starCount:number) => () => {
        setCurrentStarsCount(starCount);
    };
    const onLeave = () => {
        setCurrentStarsCount(0);
    };
    return (
        <div className={classNames(cls.StarRating, {}, [className])}>
            {stars.map((starNumber) => (
                <Icon
                    className={classNames(cls.starIcon, {}, [currentStarsCount >= starNumber ? cls.hovered : cls.normal])}
                    width={size}
                    Svg={StarSvg}
                    height={size}
                    onMouseLeave={onLeave}
                    onMouseEnter={onHover(starNumber)}
                />
            ))}
        </div>
    );
});
