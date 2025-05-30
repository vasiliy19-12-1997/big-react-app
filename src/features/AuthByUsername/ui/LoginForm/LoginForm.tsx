import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { Button } from 'shared/ui/Button/Button';
import cls from './LoginForm.module.scss';

interface LoginFormProps {
  className?: string;
}

export const LoginForm = (props: LoginFormProps) => {
    const { t } = useTranslation();
    const {
        className,
    } = props;
    return (
        <div className={classNames(cls.LoginForm, {}, [className])}>
            <input className={cls.input} type="text" />
            <input className={cls.input} type="text" />
            <Button className={cls.showBtn}>{t('Войти')}</Button>
        </div>
    );
};
