import { classNames } from 'shared/lib/classNames/classNames';
import { memo, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import cls from './Code.module.scss';
import { Button } from '../Button/Button';

interface CodeProps {
  className?: string;
  children?: ReactNode;
}

export const Code = memo((props: CodeProps) => {
    const { t } = useTranslation();
    const { className, children } = props;

    return (
        <pre className={classNames(cls.Code, {}, [className])}>
            <Button className={cls.copyBtn}>{t('Копировать')}</Button>
            <code>
                {children}
            </code>
        </pre>
    );
});
