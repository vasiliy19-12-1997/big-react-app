import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import cls from './Icon.module.scss';

interface IconProps {
  className?: string;
  Svg:React.VFC<React.SVGProps<SVGSVGElement>>;
  inverted?:boolean
}

export const Icon = memo((props: IconProps) => {
    const { t } = useTranslation();
    const { className, Svg, inverted } = props;

    return (
        <Svg className={inverted ? cls.inverted : classNames(cls.Icon, {}, [className])} />
    );
});
