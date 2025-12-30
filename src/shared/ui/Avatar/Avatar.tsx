import { CSSProperties, useMemo } from 'react';
import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import cls from './Avatar.module.scss';
import { Icon } from '../Icon';
import DefaultAvatarIcon from '@/shared/assets/icons/user-filled.svg';
import { AppImage } from '../AppImage/AppImage';
import { Sceleton } from '../Sceleton';

interface AvatarProps {
    className?: string;
    alt?: string;
    src?: string;
    size?: number;
    fallbackInverted?: boolean;
}

export const Avatar = (props: AvatarProps) => {
    const { className, alt, src, size = 100, fallbackInverted } = props;
    const errorFallback = <Icon inverted={fallbackInverted} Svg={DefaultAvatarIcon} />;
    const fallback = <Sceleton width={size} height={size} border="50%" />;
    const mods: Mods = {};
    const styles = useMemo<CSSProperties>(
        () => ({
            width: size,
            height: size,
        }),
        [size],
    );

    return (
        <AppImage
            className={classNames(cls.Avatar, mods, [className])}
            alt={alt}
            src={src}
            style={styles}
            fallback={fallback}
            errorFallback={errorFallback}
        />
    );
};
