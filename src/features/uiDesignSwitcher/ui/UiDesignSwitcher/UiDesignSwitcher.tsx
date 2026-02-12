import { memo, useState } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './UiDesignSwitcher.module.scss';
import { ListBox } from '@/shared/ui/redesigned/Popups';
import { getFeaturesFlags, updateFeatureFlag } from '@/shared/features';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { getAuthUserData } from '@/entities/User';
import { HStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';
import { Sceleton } from '@/shared/ui/redesigned/Sceleton';
import { useForceUpdate } from '@/shared/render/forceUpdate';

interface UiDesignSwitcherProps {
    className?: string;
}

export const UiDesignSwitcher = memo((props: UiDesignSwitcherProps) => {
    const { className } = props;
    const { t } = useTranslation();
    const [isLoading, setIsLoading] = useState(false);
    const isAppRedesign = getFeaturesFlags('isNewDesignEnabled');
    const dispatch = useAppDispatch();
    const authData = useSelector(getAuthUserData);
    const forceUpdate = useForceUpdate();

    const items = [
        { content: 'Новый', value: 'new' },
        { content: 'Старый', value: 'old' },
    ];
    const onChange = async (value: string) => {
        if (authData?.id) {
            setIsLoading(true);
            await dispatch(
                updateFeatureFlag({
                    userId: authData?.id,
                    newFeatures: {
                        isNewDesignEnabled: value === 'new',
                    },
                }),
            ).unwrap();
            setIsLoading(false);
            forceUpdate();
        }
    };

    return (
        <HStack>
            <Text title={t('Варианты темы')} />
            {isLoading ? (
                <Sceleton width={100} height={40} />
            ) : (
                <ListBox
                    items={items}
                    onChange={onChange}
                    value={isAppRedesign ? 'new' : 'old'}
                    className={classNames(cls.UiDesignSwitcher, {}, [className])}
                />
            )}
        </HStack>
    );
});
