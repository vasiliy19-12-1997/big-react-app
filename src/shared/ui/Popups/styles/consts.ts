import { DropDownDirection } from "shared/types/ui";
import cls from './popup.module.scss'
const mapOptionsClasses:Record<DropDownDirection, string> = {
    'bottom left': cls.optionsBottomLeft,
    'bottom right': cls.optionsBottomRight,
    'top left': cls.optionsTopLeft,
    'top right': cls.optionsTopRight,
};