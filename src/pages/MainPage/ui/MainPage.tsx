import { Counter } from '@/entities/Counter';
import { memo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Input } from '@/shared/ui/Input/Input';
import { ListBox } from '@/shared/ui/Popups';
import { HStack } from '@/shared/ui/Stack';
import { Page } from '@/widgets/Page/Page';

const MainPage = memo(() => {
    const { t } = useTranslation();
    const [value, setValue] = useState('');
    const onChange = (val:string) => {
        setValue(val);
    };
    return (
        <Page>
            {t('Главная страница')}
            <div>111</div>
            <div>111</div>
            <HStack>
                <Counter />
                <ListBox
                    onChange={(value) => {}}
                    value={undefined}
                    defaultValue={t('Выберите кнопку')}
                    items={[
                        { value: '123', content: 'USD' },
                        { value: '123', content: 'EUR', disabled: true },
                        { value: '123', content: 'BYN' }]}

                />
            </HStack>
            <div>111</div>
            <div>111</div>
            <div>111</div>
            <div>111</div>
            <div>111</div>

            <Input
                onChange={onChange}
                value={value}
                placeholder={t('Введите текст')}

            />
        </Page>
    );
});

export default MainPage;
