import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Icon.module.scss';

interface IconProps extends React.SVGProps<SVGSVGElement> {
    className?: string;
    Svg: React.VFC<React.SVGProps<SVGSVGElement>>;
    inverted?: boolean;
}
/**
 * Компонент устарел, пожалуйста используйте ui библиотеку из папки redesign
 * @deprecated
 */
export const Icon = memo((props: IconProps) => {
    const { t } = useTranslation();
    const { className, Svg, inverted, ...otherProps } = props;

    return <Svg className={inverted ? cls.inverted : classNames(cls.Icon, {}, [className])} {...otherProps} />;
});
