import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Icon.module.scss';

interface IconProps extends React.SVGProps<SVGSVGElement> {
    className?: string;
    Svg: React.VFC<React.SVGProps<SVGSVGElement>>;
}

export const Icon = memo((props: IconProps) => {
    const { t } = useTranslation();
    const { className, Svg, width = 32, height = 32, ...otherProps } = props;

    return <Svg className={classNames(cls.Icon, {}, [className])} width={width} height={height} {...otherProps} />;
});
