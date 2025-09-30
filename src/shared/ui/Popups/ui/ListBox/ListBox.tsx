import {
    Listbox as HListBox,
} from '@headlessui/react';
import { Fragment, ReactNode } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { DropDownDirection } from 'shared/types/ui';
import { Button } from '../Button/Button';
import cls from './ListBox.module.scss';
import { HStack } from '../Stack';

export interface ListBoxItem{
    value:string;
    content:ReactNode;
    disabled?:boolean
}
interface ListboxProps{
    className?: string;
    items?:ListBoxItem[]
    value?:string
    defaultValue?:string;
    onChange:(value:string)=>void
    readonly?:boolean;
    direction?:DropDownDirection
    label?:string
}
const mapOptionsClasses:Record<DropDownDirection, string> = {
    'bottom left': cls.optionsBottomLeft,
    'bottom right': cls.optionsBottomRight,
    'top left': cls.optionsTopLeft,
    'top right': cls.optionsTopRight,
};
export function ListBox(props:ListboxProps) {
    const {
        className,
        items,
        value,
        defaultValue,
        onChange,
        readonly,
        direction = 'bottom right',
        label,
    } = props;
    const optionsMods = [className, mapOptionsClasses[direction]];
    return (
        <HStack gap={4}>
            {label && <span>{`${label}>`}</span>}
            <HListBox disabled={readonly} as="div" className={classNames(cls.ListBox, {}, [className])} value={value} onChange={onChange}>
                <HListBox.Button className={cls.button}>
                    <Button disabled={readonly}>
                        {value ?? defaultValue}
                    </Button>
                </HListBox.Button>
                <HListBox.Options className={classNames(cls.options, {}, optionsMods)}>

                    {items?.map((item) => (
                        <HListBox.Option as={Fragment} key={item?.value} value={item?.value}>
                            {({ selected, active }) => (
                                <li className={classNames(
                                    cls.item,
                                    { [cls.active]: active, [cls.disabled]: item?.disabled },

                                )}
                                >
                                    {selected && '!!!'}
                                    {item?.content}
                                </li>
                            )}

                        </HListBox.Option>
                    ))}
                </HListBox.Options>
            </HListBox>
        </HStack>

    );
}
