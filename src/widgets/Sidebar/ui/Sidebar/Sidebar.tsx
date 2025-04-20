import { FC, useState } from 'react';
import { ClassNames } from 'shared/lib/classNames/ClassNames';
import { ThemeSwitcher } from 'widgets/ThemeSwitcher';
import { LangSwither } from 'widgets/LangSwitcher';
import s from './Sidebar.module.scss';

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
            <button type="button" onClick={onToggle}>toggle</button>
            <div className={s.switchers}>
                <ThemeSwitcher />
                <LangSwither className={s.lang} />
            </div>
        </div>
    );
};
