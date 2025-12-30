import { Popover as HPopOver } from '@headlessui/react';
import { ReactNode } from 'react';
import { Direction } from '@/shared/types/ui';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './PopOver.module.scss';

import popUpCls from '../../styles/popup.module.scss';
import { mapOptionsClasses } from '../../styles/consts';

interface PopOverProps {
    className?: string;
    trigger: ReactNode;
    direction?: Direction;
    children: ReactNode;
}
export function PopOver(props: PopOverProps) {
    const { className, trigger, direction = 'bottom right', children } = props;
    const optionsMods = [className, mapOptionsClasses[direction]];
    return (
        <HPopOver className={classNames(cls.PopOver, {}, [className, popUpCls.popUp])}>
            <HPopOver.Button as="div" className={popUpCls.trigger}>
                {trigger}
            </HPopOver.Button>
            <HPopOver.Panel className={classNames(cls.panel, {}, optionsMods)}>{children}</HPopOver.Panel>
        </HPopOver>
    );
}
