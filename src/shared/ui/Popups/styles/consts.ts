import { Direction } from '@/shared/types/ui';
import cls from './popup.module.scss';

export const mapOptionsClasses:Record<Direction, string> = {
    'bottom left': cls.optionsBottomLeft,
    'bottom right': cls.optionsBottomRight,
    'top left': cls.optionsTopLeft,
    'top right': cls.optionsTopRight,
};
