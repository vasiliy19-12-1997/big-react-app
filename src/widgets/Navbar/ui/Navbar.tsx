import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { Modal } from 'shared/ui/Modal/Modal';
import cls from './Navbar.module.scss';

interface NavbarProps {
    className?: string;
}

export const Navbar = ({ className }: NavbarProps) => {
    const { t } = useTranslation();
    const [isAuthModal, setIsAuthModal] = useState(false);
    const onToggleModal = () => {
        setIsAuthModal((prev) => !prev);
    };
    return (
        <div className={classNames(cls.Navbar, {}, [className])}>
            <div className={cls.links}>
                <Button theme={ButtonTheme.CLEAR_INVERTED} onClick={onToggleModal}>
                    {t('Войти')}
                </Button>
                <Modal onClose={onToggleModal} isOpen={isAuthModal}>
                    {t(` Lorem ipsum dolor sit amet consectetur
                     adipisicing elit. Corrupti ullam assumenda eius saepe,
                      nihil id minima vel laboriosam ab. Eligendi reprehenderit 
                      voluptas iure doloremque tenetur voluptatem, sunt beatae enim laudantium.`)}

                </Modal>
            </div>
        </div>
    );
};
