import { CSSProperties, useMemo } from 'react';
import { classNames, Mods } from 'shared/lib/classNames/classNames';
import cls from './Avatar.module.scss';

interface AvatarProps {
  className?: string;
  alt?:string;
  src?:string;
  size?:number
}

export const Avatar = (props: AvatarProps) => {
    const {
        className,
        alt,
        src,
        size,
    } = props;

    const mods:Mods = {};
    const styles = useMemo<CSSProperties>(() => ({
        width: size || 100,
        height: size || 100,
    }), [size]);

    return (
        <img
            className={classNames(cls.Avatar, mods, [className])}
            alt={alt}
            src={src}
            style={styles}
        />
    );
};
