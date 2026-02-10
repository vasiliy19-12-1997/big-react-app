import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Text as TextDeprecated } from '@/shared/ui/deprecated/Text';
import { Text } from '@/shared/ui/redesigned/Text';
import { ArtcileBlockImage } from '../../model/types/artcile';
import cls from './ArtcileImageBlockComponent.module.scss';
import { ToggleFeatures } from '@/shared/features';

interface ArtcileImageBlockComponentProps {
    className?: string;
    block?: ArtcileBlockImage;
}

export const ArtcileImageBlockComponent = (props: ArtcileImageBlockComponentProps) => {
    const { t } = useTranslation();
    const { className, block } = props;

    return (
        <ToggleFeatures
            name="isNewDesignEnabled"
            on={
                <div className={classNames(cls.ArtcileImageBlockComponent, {}, [className])}>
                    <img src={block?.src} alt={block?.title} />
                    {block?.title && <Text text={block.title} />}
                </div>
            }
            off={
                <div className={classNames(cls.ArtcileImageBlockComponent, {}, [className])}>
                    <img src={block?.src} alt={block?.title} />
                    {block?.title && <TextDeprecated text={block.title} />}
                </div>
            }
        />
    );
};
