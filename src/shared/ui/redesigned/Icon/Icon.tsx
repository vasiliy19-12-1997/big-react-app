import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Icon.module.scss';

type SvgProps = Omit<React.SVGProps<SVGSVGElement>, 'onClick'>;

interface IconBaseProps extends SvgProps {
    className?: string;
    Svg: React.VFC<React.SVGProps<SVGSVGElement>>;
}

interface IconClickableProps extends IconBaseProps {
    className?: string;
    clickable: true;
    onClick: () => void;
}
interface IconNoClickableProps extends IconBaseProps {
    className?: string;
    clickable?: false;
}
type IconProps = IconClickableProps | IconNoClickableProps;

export const Icon = memo((props: IconProps) => {
    const { t } = useTranslation();
    const { className, Svg, width = 32, height = 32, clickable, ...otherProps } = props;
    const icon = (
        <Svg
            className={classNames(cls.Icon, {}, [className])}
            width={width}
            height={height}
            onClick={undefined}
            {...otherProps}
        />
    );
    if (clickable) {
        return (
            <button type="button" className={cls.button} onClick={props.onClick} style={{ height, width }}>
                {icon}
            </button>
        );
    }
    return icon;
});
