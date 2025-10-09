import { classNames } from '@/shared/lib/classNames/classNames';
import { CSSProperties, memo } from 'react';
import cls from './Sceleton.module.scss';

interface SceletonProps {
    className?: string;
    width?:string | number;
    height?:string | number;
    border?:string;
}

export const Sceleton = memo((props: SceletonProps) => {
    const {
        className, width, height, border,
    } = props;
    const styles:CSSProperties = {
        width,
        height,
        borderRadius: border,
    };
    return (
        <div className={classNames(cls.Sceleton, {}, [className])} style={styles} />);
});
