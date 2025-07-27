import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { ArtcileBlockText, ArtcileTypeBlocks } from 'entities/Article/model/types/artcile';
import { Text } from 'shared/ui/Text/Text';
import cls from './ArtcileTextBlockComponent.module.scss';

interface ArtcileTextBlockComponentProps {
  className?: string;
  block?:ArtcileBlockText;
}

export const ArtcileTextBlockComponent = (props: ArtcileTextBlockComponentProps) => {
    const { t } = useTranslation();
    const { className, block } = props;

    return (
        <div className={classNames(cls.ArtcileTextBlockComponent, {}, [className])}>
            {block?.title && (
                <Text title={block.title} className={cls.title} />
            )}
            {block?.paragraphs.map((paragraphs, index) => (
                <Text key={paragraphs} text={paragraphs} className={cls.paragraphs} />
            ))}

        </div>
    );
};
