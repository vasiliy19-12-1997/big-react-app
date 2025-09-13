import {
    Listbox as HListBox,
} from '@headlessui/react';
import { Fragment, ReactNode } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button } from '../Button/Button';
import cls from './ListBox.module.scss';
import { HStack } from '../Stack';

export interface ListBoxItem{
    value:string;
    content:ReactNode;
    disabled?:boolean
}
export type DropDownOptions = 'top' | 'bottom'
interface ListboxProps{
    className?: string;
    items?:ListBoxItem[]
    value?:string
    defaultValue?:string;
    onChange:(value:string)=>void
    readonly?:boolean;
    direction?:DropDownOptions
    label?:string
}
const mapOptionsClasses:Record<DropDownOptions, string> = {
    bottom: cls.optionsBottom,
    top: cls.optionsTop,
};
export function ListBox(props:ListboxProps) {
    const {
        className,
        items,
        value,
        defaultValue,
        onChange,
        readonly,
        direction = 'bottom',
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
