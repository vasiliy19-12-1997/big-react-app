import { FC } from 'react';
import { ClassNames } from 'shared/lib/classNames/ClassNames';
import { Loader } from 'shared/ui/Loader/Loader';
import s from './PageLoader.module.scss';

interface IPageLoaderProps {
  className?: string;
}

export const PageLoader: FC<IPageLoaderProps> = ({ className }) => (
    <div className={ClassNames(s.PageLoader, {}, [className])}>
        <Loader />
    </div>
);
