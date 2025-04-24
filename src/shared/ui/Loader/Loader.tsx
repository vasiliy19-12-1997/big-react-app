import { FC } from 'react';
import { ClassNames } from 'shared/lib/classNames/ClassNames';
import './Loader.scss';

interface ILoaderProps {
  className?: string;
}

export const Loader: FC<ILoaderProps> = ({ className }) => (
    <div className={ClassNames('loader', {}, [className])}>
        <span />
    </div>
);
