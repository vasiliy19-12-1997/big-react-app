import { classNames } from 'shared/lib/classNames/classNames';
import cls from './Counter.module.scss';

interface CounterProps {
  className?: string;
}

export const Counter = (props: CounterProps) => {
    const {
        className,
    } = props;
    return (
        <div className={classNames(cls.Counter, {}, [className])} />
    );
};
