import { FC } from 'react';
import { ClassNames } from 'shared/lib/classNames/classNames';
import { AppLink, AppLinkTheme } from 'shared/ui/AppLink/AppLink';
import s from './Navbar.module.scss';

interface INavbarProps {
  className?: string;
}
export const Navbar: FC<INavbarProps> = ({ className }) => (
    <div className={ClassNames(s.Navbar, {}, [className])}>
        <div className={s.NavbarLinks}>
            <AppLink className={s.NavbarMain} to="/" theme={AppLinkTheme.PRIMARY}>
                MainPage
            </AppLink>
            <AppLink theme={AppLinkTheme.PRIMARY} to="/about">
                AboutPage
            </AppLink>
        </div>
    </div>
);
