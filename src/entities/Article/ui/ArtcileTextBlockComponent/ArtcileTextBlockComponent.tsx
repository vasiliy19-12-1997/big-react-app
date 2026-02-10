import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Text as TextDeprecated } from '@/shared/ui/deprecated/Text';
import { Text } from '@/shared/ui/redesigned/Text';
import { ArtcileBlockText } from '../../model/types/artcile';
import cls from './ArtcileTextBlockComponent.module.scss';
import { ToggleFeatures } from '@/shared/features';

interface ArtcileTextBlockComponentProps {
    className?: string;
    block?: ArtcileBlockText;
}

export const ArtcileTextBlockComponent = (props: ArtcileTextBlockComponentProps) => {
    const { t } = useTranslation();
    const { className, block } = props;

    return (
        <ToggleFeatures
            name="isNewDesignEnabled"
            on={
                <div className={classNames(cls.ArtcileTextBlockComponent, {}, [className])}>
                    {block?.title && <Text title={block.title} className={cls.title} />}
                    {block?.paragraphs.map((paragraphs, index) => (
                        <Text key={paragraphs} text={paragraphs} className={cls.paragraphs} />
                    ))}
                </div>
            }
            off={
                <div className={classNames(cls.ArtcileTextBlockComponent, {}, [className])}>
                    {block?.title && <TextDeprecated title={block.title} className={cls.title} />}
                    {block?.paragraphs.map((paragraphs, index) => (
                        <TextDeprecated key={paragraphs} text={paragraphs} className={cls.paragraphs} />
                    ))}
                </div>
            }
        />
    );
};
