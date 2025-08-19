import { memo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Input } from 'shared/ui/Input/Input';
import { Page } from 'widgets/Page/Page';

const MainPage = memo(() => {
    const { t } = useTranslation();
    const [value, setValue] = useState('');
    const onChange = (val:string) => {
        setValue(val);
    };
    return (
        <Page>
            {t('Главная страница')}
            <Input
                onChange={onChange}
                value={value}
                placeholder={t('Введите текст')}

            />
        </Page>
    );
});

export default MainPage;
