import { Menu } from '@headlessui/react';
import { classNames } from 'shared/lib/classNames/classNames';
import { Fragment, ReactNode } from 'react';
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
}
export function DropDown(props:DropDownProps) {
    const { className, items, trigger } = props;
    return (
        <Menu as="div" className={classNames(cls.DropDown, {}, [className])}>
            <Menu.Button className={cls.btn}>{trigger}</Menu.Button>
            <Menu.Items className={cls.menu}>
                {items.map((item, index) => (
                    <Menu.Item as={Fragment}>
                        {({ active }) => (
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
                        )}
                    </Menu.Item>
                ))}
            </Menu.Items>

        </Menu>
    );
}
