import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { ArtcileBlockCode } from 'entities/Article/model/types/artcile';
import { Code } from 'shared/ui/Code/Code';
import { Text } from 'shared/ui/Text/Text';
import cls from './ArtcileCodeBlockComponent.module.scss';

interface ArtcileCodeBlockComponentProps {
  className?: string;
  block?: ArtcileBlockCode
}

export const ArtcileCodeBlockComponent = (props: ArtcileCodeBlockComponentProps) => {
    const { t } = useTranslation();
    const { className, block } = props;

    return (
        // eslint-disable-next-line i18next/no-literal-string
        <div className={classNames(cls.ArtcileCodeBlockComponent, {}, [className])}>
            {block?.code && (
                <Code text={block.code} />
            )}
        </div>

    );
};
