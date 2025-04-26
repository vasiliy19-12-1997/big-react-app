import { FC, useState } from 'react';
import { ClassNames } from 'shared/lib/classNames/ClassNames';
import { useTranslation } from 'react-i18next';
import { Button } from 'shared/ui/Button/Button';
import s from './PageError.module.scss';

interface IPageErrorProps {
  className?: string;
}

export const PageError: FC<IPageErrorProps> = ({ className }) => {
    const { t } = useTranslation();
    const reloadPage = () => {
        // eslint-disable-next-line no-restricted-globals
        location.reload();
    };

    return (
        <div className={ClassNames(s.PageError, {}, [className])}>
            <p>{t('Произошла непридвиденная ошибка')}</p>
            <Button onClick={reloadPage}>
                {t('Перезагрузить страницу')}
            </Button>
        </div>
    );
};
