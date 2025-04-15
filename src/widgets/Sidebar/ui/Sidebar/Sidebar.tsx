import { FC, useState } from "react";
import { ClassNames } from "shared/lib/classNames/ClassNames";
import s from "./Sidebar.module.scss";
import { ThemeSwitcher } from "shared/ui/ThemeSwitcher";

interface ISidebarProps {
  className?: string;
}

export const Sidebar: FC<ISidebarProps> = ({ className }) => {
  const [collapsed, setCollapsed] = useState(false);
  const onToggle = () => {
    setCollapsed((prev) => !prev);
  };

  return (
    <div
      className={ClassNames(s.Sidebar, { [s.collapsed]: collapsed }, [
        className,
      ])}
    >
      <button onClick={onToggle}>toggle</button>
      <div className={s.swithcers}>
        <ThemeSwitcher />
      </div>
    </div>
  );
};
