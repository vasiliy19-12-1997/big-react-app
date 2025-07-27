import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { ArtcileBlockImage } from 'entities/Article/model/types/artcile';
import { Text } from 'shared/ui/Text/Text';
import cls from './ArtcileImageBlockComponent.module.scss';

interface ArtcileImageBlockComponentProps {
  className?: string;
  block?:ArtcileBlockImage
}

export const ArtcileImageBlockComponent = (props: ArtcileImageBlockComponentProps) => {
    const { t } = useTranslation();
    const { className, block } = props;

    return (
        // eslint-disable-next-line i18next/no-literal-string
        <div className={classNames(cls.ArtcileImageBlockComponent, {}, [className])}>
            <img src={block?.src} alt={block?.title} />
            {block?.title && (
                <Text text={block.title} />
            )}
        </div>
    );
};
