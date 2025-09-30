import { Menu } from '@headlessui/react';
import { Fragment, ReactNode } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { DropDownDirection } from 'shared/types/ui';
import cls from './DropDown.module.scss';

export interface DropDownItem {
  disabled?:boolean,
  content?:ReactNode,
  onClick?:()=>void,
  href?:string
}
export interface DropDownProps{
   className?: string;
   items:DropDownItem[],
   trigger:ReactNode,
   direction?:DropDownDirection
}

export function DropDown(props:DropDownProps) {
    const {
        className, items, trigger, direction = 'bottom right',
    } = props;
    const optionsMods = [className, mapOptionsClasses[direction]];

    return (
        <Menu as="div" className={classNames(cls.DropDown, {}, [className])}>
            <Menu.Button className={cls.btn}>{trigger}</Menu.Button>
            <Menu.Items className={classNames(cls.menu, {}, optionsMods)}>
                {items.map((item) => {
                    const content = ({ active }:{active:boolean}) => (
                        <button
                            onClick={item.onClick}
                            type="button"
                            className={classNames(
                                cls.item,
                                { [cls.active]: active },

                            )}
                        >
                            {item.content}
                        </button>
                    );
                    if (item.href) {
                        return (
                            <Menu.Item to={item.href} as={AppLink}>
                                {content}
                            </Menu.Item>
                        );
                    }
                    return (
                        <Menu.Item as={Fragment}>
                            {content}
                        </Menu.Item>
                    );
                })}
            </Menu.Items>

        </Menu>
    );
}
