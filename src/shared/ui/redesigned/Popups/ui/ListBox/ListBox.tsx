import { Listbox as HListBox } from '@headlessui/react';
import { Fragment, ReactNode, useMemo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Direction } from '@/shared/types/ui';
import { Button } from '../../../Button/Button';
import cls from './ListBox.module.scss';
import popUpCls from '../../styles/popup.module.scss';
import { mapOptionsClasses } from '../../styles/consts';
import { HStack } from '../../../Stack';
import ArrowIcon from '@/shared/assets/icons/arrow-bottom.svg';
import { Icon } from '../../../Icon';

export interface ListBoxItem<T extends string> {
    value: T;
    content: ReactNode;
    disabled?: boolean;
}
interface ListboxProps<T extends string> {
    className?: string;
    items?: ListBoxItem<T>[];
    value?: T;
    defaultValue?: string;
    onChange: (value: T) => void;
    readonly?: boolean;
    direction?: Direction;
    label?: string;
}

export function ListBox<T extends string>(props: ListboxProps<T>) {
    const { className, items, value, defaultValue, onChange, readonly, direction = 'bottom right', label } = props;
    const optionsMods = [className, mapOptionsClasses[direction], popUpCls.menu];

    const selectedItems = useMemo(() => {
        return items?.find((item) => item.value === value);
    }, [items, value]);

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
                <HListBox.Button as="div" className={cls.trigger}>
                    <Button addonRight={<Icon Svg={ArrowIcon} />} variant="filled" disabled={readonly}>
                        {selectedItems?.content ?? defaultValue}
                    </Button>
                </HListBox.Button>
                <HListBox.Options className={classNames(cls.options, {}, optionsMods)}>
                    {items?.map((item) => (
                        <HListBox.Option as={Fragment} key={item?.value} value={item?.value}>
                            {({ selected, active }) => (
                                <li
                                    className={classNames(cls.item, {
                                        [popUpCls.active]: active,
                                        [popUpCls.disabled]: item?.disabled,
                                        [popUpCls.selected]: selected,
                                    })}
                                >
                                    {selected}
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
