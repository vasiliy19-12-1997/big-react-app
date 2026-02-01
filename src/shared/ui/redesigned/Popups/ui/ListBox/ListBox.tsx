import { Listbox as HListBox } from '@headlessui/react';
import { Fragment, ReactNode } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Direction } from '@/shared/types/ui';
import { Button } from '../../../Button/Button';
import cls from './ListBox.module.scss';
import popUpCls from '../../styles/popup.module.scss';
import { mapOptionsClasses } from '../../styles/consts';
import { HStack } from '../../../Stack';

export interface ListBoxItem {
    value: string;
    content: ReactNode;
    disabled?: boolean;
}
interface ListboxProps {
    className?: string;
    items?: ListBoxItem[];
    value?: string;
    defaultValue?: string;
    onChange: (value: string) => void;
    readonly?: boolean;
    direction?: Direction;
    label?: string;
}

export function ListBox(props: ListboxProps) {
    const { className, items, value, defaultValue, onChange, readonly, direction = 'bottom right', label } = props;
    const optionsMods = [className, mapOptionsClasses[direction]];
    return (
        <HStack gap={4}>
            {label && <span>{`${label}>`}</span>}
            <HListBox
                disabled={readonly}
                as="div"
                className={classNames(cls.ListBox, {}, [className, popUpCls.popUp])}
                value={value}
                onChange={onChange}
            >
                <HListBox.Button className={cls.trigger}>
                    <Button disabled={readonly}>{value ?? defaultValue}</Button>
                </HListBox.Button>
                <HListBox.Options className={classNames(cls.options, {}, optionsMods)}>
                    {items?.map((item) => (
                        <HListBox.Option as={Fragment} key={item?.value} value={item?.value}>
                            {({ selected, active }) => (
                                <li
                                    className={classNames(cls.item, {
                                        [popUpCls.active]: active,
                                        [popUpCls.disabled]: item?.disabled,
                                    })}
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
