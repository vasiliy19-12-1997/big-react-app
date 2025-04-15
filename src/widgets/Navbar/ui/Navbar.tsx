import { FC } from "react";
import { ClassNames } from "shared/lib/classNames/ClassNames";
import { AppLink, AppLinkTheme } from "shared/ui/AppLink/AppLink";
import s from "./Navbar.module.scss";
import { ThemeSwitcher } from "shared/ui/ThemeSwitcher";

interface INavbarProps {
  className?: string;
}
export const Navbar: FC<INavbarProps> = ({ className }) => {
  return (
    <div className={ClassNames(s.Navbar, {}, [className])}>
      <div className={s.NavbarLinks}>
        <AppLink className={s.NavbarMain} to="/" theme={AppLinkTheme.SECONDARY}>
          MainPage
        </AppLink>
        <AppLink theme={AppLinkTheme.PRIMARY} to="/about">
          AboutPage
        </AppLink>
      </div>
    </div>
  );
};
