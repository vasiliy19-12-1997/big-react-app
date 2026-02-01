import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import AppSvg from '@/shared/assets/icons/app-image.svg';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './AppLogo.module.scss';
import { HStack } from '../Stack';

interface AppLogoProps {
    className?: string;
    size?: number;
}

export const AppLogo = memo((props: AppLogoProps) => {
    const { t } = useTranslation();
    const { className, size = 50 } = props;

    return (
        <HStack max justify="center" className={classNames(cls.appLogoWrapper, {}, [className])}>
            <div className={cls.gradientBig} />
            <div className={cls.gradientSmall} />
            <AppSvg width={size} height={size} color="black" className={cls.appLogo} />
        </HStack>
    );
});
