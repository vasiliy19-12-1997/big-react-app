import { memo } from 'react';
import { classNames, Mods } from 'shared/lib/classNames/classNames';
import cls from './Text.module.scss';

export enum TextTheme {
    PRIMARY = 'primary',
    ERROR = 'error',
    INVERTED = 'inverted'
}
export enum TextAlign{
    LEFT='left',
    RIGHT='right',
    CENTER='center'
}
export enum TextSize{
    S='size_s',
    M='size_m',
    L='size_l',
}
interface TextProps{
   className?:string;
    title?:string;
    text?:string;
    theme?:TextTheme;
    align?:TextAlign;
    size?:TextSize;
    'data-testid'?:string
}
type HeaderTagType = 'h1' | 'h2' | 'h3'
const mapSizeHeaderTag:Record<TextSize, HeaderTagType> = {
    [TextSize.S]: 'h1',
    [TextSize.M]: 'h2',
    [TextSize.L]: 'h3',
};
export const Text = memo((props:TextProps) => {
    const {
        className,
        title,
        text,
        theme = TextTheme.PRIMARY,
        align = TextAlign.LEFT,
        size = TextSize.M,
        'data-testid': dataTestId = 'Text',
    } = props;
    const HeaderTag = mapSizeHeaderTag[size];
    const mods:Mods = {
        [cls[theme]]: true,
        [cls[align]]: true,
        [cls[size]]: true,
    };
    return (
        <div className={classNames(cls.Text, mods, [className])}>
            {title && (
                <HeaderTag
                    className={cls.title}
                    data-testid={`${dataTestId}.Header`}
                >
                    {title}
                </HeaderTag>
            )}
            {text && (
                <p
                    data-testid={`${dataTestId}.Paragraph`}
                    className={cls.text}
                >
                    {text}
                </p>
            )}
        </div>
    );
});
