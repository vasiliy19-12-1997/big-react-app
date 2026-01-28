import { ImgHTMLAttributes, memo, ReactElement, useLayoutEffect, useState } from 'react';

interface AppImageProps extends ImgHTMLAttributes<HTMLImageElement> {
    className?: string;
    fallback?: ReactElement;
    errorFallback?: ReactElement;
}
/**
 * Компонент устарел, пожалуйста используйте ui библиотеку из папки redesign
 * @deprecated
 */
export const AppImage = memo((props: AppImageProps) => {
    const { className, alt = 'image', src, fallback, errorFallback } = props;

    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    useLayoutEffect(() => {
        const img = new Image();
        img.src = src || '';
        img.onload = () => {
            setIsLoading(false);
        };
        img.onerror = () => {
            setHasError(true);
            setIsLoading(false);
        };
    }, [src]);

    if (isLoading && fallback) {
        return fallback;
    }
    if (hasError && errorFallback) {
        return errorFallback;
    }

    return <img src={src} alt={alt} className={className} />;
});
