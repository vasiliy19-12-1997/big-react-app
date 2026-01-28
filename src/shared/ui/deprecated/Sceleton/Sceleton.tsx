import { CSSProperties, memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Sceleton.module.scss';

interface SceletonProps {
    className?: string;
    width?: string | number;
    height?: string | number;
    border?: string;
}
/**
 * Компонент устарел, пожалуйста используйте ui библиотеку из папки redesign
 * @deprecated
 */
export const Sceleton = memo((props: SceletonProps) => {
    const { className, width, height, border } = props;
    const styles: CSSProperties = {
        width,
        height,
        borderRadius: border,
    };
    return <div className={classNames(cls.Sceleton, {}, [className])} style={styles} />;
});
