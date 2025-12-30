import { Menu } from '@headlessui/react';
import { Fragment, ReactNode } from 'react';
import { classNames } from '../../../../lib/classNames/classNames';
import { Direction } from '../../../../types/ui';
import cls from './DropDown.module.scss';
import { mapOptionsClasses } from '../../styles/consts';
import { AppLink } from '../../../AppLink/AppLink';
import popUpCls from '../../styles/popup.module.scss';

export interface DropDownItem {
    disabled?: boolean;
    content?: ReactNode;
    onClick?: () => void;
    href?: string;
}
export interface DropDownProps {
    className?: string;
    items: DropDownItem[];
    trigger: ReactNode;
    direction?: Direction;
}

export function DropDown(props: DropDownProps) {
    const { className, items, trigger, direction = 'bottom right' } = props;
    const optionsMods = [className, mapOptionsClasses[direction]];

    return (
        <Menu as="div" className={classNames(cls.DropDown, {}, [className, popUpCls.popUp])}>
            <Menu.Button className={popUpCls.trigger}>{trigger}</Menu.Button>
            <Menu.Items className={classNames(cls.menu, {}, optionsMods)}>
                {items.map((item, index) => {
                    const content = ({ active }: { active: boolean }) => (
                        <button
                            key={`dropdowm-button ${index}`}
                            onClick={item.onClick}
                            type="button"
                            className={classNames(cls.item, { [popUpCls.active]: active })}
                        >
                            {item.content}
                        </button>
                    );
                    if (item.href) {
                        return (
                            <Menu.Item to={item.href} as={AppLink} key={`dropdowm-item ${index}`}>
                                {content}
                            </Menu.Item>
                        );
                    }
                    return (
                        <Menu.Item as={Fragment} key={`dropdowm-fragment ${index}`}>
                            {content}
                        </Menu.Item>
                    );
                })}
            </Menu.Items>
        </Menu>
    );
}
