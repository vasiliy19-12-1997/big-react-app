import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { ClassNames } from 'shared/lib/classNames/ClassNames';
import s from './NotFoundPage.module.scss';

interface INotFoundPageProps {
  className?: string;
}

export const NotFoundPage: FC<INotFoundPageProps> = ({ className }) => {
    const { t, i18n } = useTranslation('not_found');
    return (
        <div className={ClassNames(s.NotFoundPage, {}, [className])}>
            <h1>{t('PAGE NOT FOUND')}</h1>
        </div>
    );
};
