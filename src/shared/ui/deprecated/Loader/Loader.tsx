import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import './Loader.scss';

interface LoaderProps {
    className?: string;
}
/**
 * Компонент устарел, пожалуйста используйте ui библиотеку из папки redesign
 * @deprecated
 */
export const Loader = memo(({ className }: LoaderProps) => (
    <div className={classNames('lds-ellipsis', {}, [className])}>
        <div />
        <div />
        <div />
        <div />
    </div>
));
