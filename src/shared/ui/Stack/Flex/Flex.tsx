import {
    DetailedHTMLProps, HTMLAttributes,
    ReactNode,
} from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Flex.module.scss';

type FlexJustify = 'start' | 'center' | 'end' | 'between'
type FlexAlign = 'start' | 'center' | 'end'
type FlexDirection = 'column' | 'row'
type FlexGap = 4 | 8 | 16 | 32

const justifyClasses:Record<FlexJustify, string> = {
    center: cls.JustifyCenter,
    between: cls.JustifyBetween,
    end: cls.JustifyEnd,
    start: cls.JustifyStart,
};
const alignClasses:Record<FlexAlign, string> = {
    center: cls.AlignCenter,
    end: cls.AlignEnd,
    start: cls.AlignStart,
};
const directionClasses:Record<FlexDirection, string> = {
    column: cls.DirectionColumn,
    row: cls.DirectionRow,
};
const gapClasses:Record<FlexGap, string> = {
    4: cls.gap4,
    8: cls.gap8,
    16: cls.gap16,
    32: cls.gap32,
};
type divType = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;
export interface FlexProps extends divType {
  className?: string;
  children:ReactNode
  justify?:FlexJustify,
  align?:FlexAlign,
  direction:FlexDirection,
  gap?:FlexGap,
  max?:boolean
}

export const Flex = (props: FlexProps) => {
    const { t } = useTranslation();
    const {
        className,
        children,
        justify = 'center',
        align = 'center',
        direction = 'row',
        gap = 4,
        max,
        ...otherProps
    } = props;
    const classes = [
        className,
        justifyClasses[justify],
        alignClasses[align],
        directionClasses[direction],
        gap && gapClasses[gap],
    ];
    const mods = {
        [cls.max]: max,
    };
    return (
        <div className={classNames(cls.Flex, mods, classes)} {...otherProps}>
            {children}
        </div>
    );
};
