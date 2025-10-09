import { classNames } from '@/shared/lib/classNames/classNames';
import { memo } from 'react';
import { Loader } from '../Loader/Loader';
import cls from './PageLoader.module.scss';

interface PageLoaderProps {
    className?: string;
}

export const PageLoader = memo(({ className }: PageLoaderProps) => (
    <div className={classNames(cls.PageLoader, {}, [className])}>
        <Loader />
    </div>
));
