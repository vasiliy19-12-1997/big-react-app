import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Input } from 'shared/ui/Input/Input';

const MainPage = () => {
    const { t } = useTranslation();
    const [value, setValue] = useState('');
    const onChange = (val:string) => {
        setValue(val);
    };
    return (
        <div>
            {t('Главная страница')}
            <Input
                onChange={onChange}
                value={value}
                placeholder="Введите текст"

            />
        </div>
    );
};

export default MainPage;
