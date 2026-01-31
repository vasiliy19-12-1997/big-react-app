import { FC } from 'react';
import { LinkProps, NavLink } from 'react-router-dom';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './AppLink.module.scss';

export type AppLinkVariant = 'primary' | 'secondary' | 'red';

interface AppLinkProps extends LinkProps {
    className?: string;
    variant?: AppLinkVariant;
    activeClassName?: string;
}
export const AppLink: FC<AppLinkProps> = (props) => {
    const { to, className, children, variant = 'primary', activeClassName = '', ...otherProps } = props;

    return (
        <NavLink
            to={to}
            className={({ isActive }) =>
                classNames(cls.AppLink, { [activeClassName]: isActive }, [className, cls[variant]])
            }
            {...otherProps}
        >
            {children}
        </NavLink>
    );
};
