import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { ClassNames } from 'shared/lib/classNames/ClassNames';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';

interface ILangSwitherProps {
  className?: string;
}

export const LangSwither: FC<ILangSwitherProps> = ({ className }) => {
    const { t, i18n } = useTranslation();
    const toggleLanguage = () => {
        i18n.changeLanguage(i18n.language === 'ru' ? 'en' : 'ru');
    };
    return (
        <Button
            className={ClassNames('', {}, [className])}
            theme={ButtonTheme.CLEAR}
            onClick={toggleLanguage}
        >
            {t('Translate')}
        </Button>
    );
};
