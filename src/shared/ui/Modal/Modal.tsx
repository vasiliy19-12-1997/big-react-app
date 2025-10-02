import {
    ReactNode,
} from 'react';
import { classNames, Mods } from 'shared/lib/classNames/classNames';
import { useModal } from 'shared/lib/hooks/useModal/useModal';
import { Overlay } from '../Overlay/Overlay';
import { Portal } from '../Portal/Portal';
import cls from './Modal.module.scss';

interface ModalProps {
    className?: string;
    children?:ReactNode;
    isOpen?:boolean;
    onClose?:()=>void;
    lazy?:boolean;
}

export const Modal = (props: ModalProps) => {
    const {
        className,
        children,
        isOpen,
        onClose,
        lazy,
    } = props;
    const { isClosing, isMounted, close } = useModal({ onClose, isOpen, animationDelay: 500 });
    const mods:Mods = {
        [cls.opened]: isOpen,
        [cls.isClosing]: isClosing,
    };
    if (lazy && !isMounted) {
        return null;
    }
    return (
        <Portal>
            <div className={classNames(cls.Modal, mods, [className])}>
                <Overlay onClick={close} />
                <div
                    className={
                        cls.content
                    }
                >
                    {children}
                </div>
            </div>
        </Portal>

    );
};
