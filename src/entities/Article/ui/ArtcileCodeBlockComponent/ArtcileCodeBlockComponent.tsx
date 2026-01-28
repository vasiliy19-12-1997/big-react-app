import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Code } from '@/shared/ui/deprecated/Code';
import { ArtcileBlockCode } from '../../../Article/model/types/artcile';
import cls from './ArtcileCodeBlockComponent.module.scss';

interface ArtcileCodeBlockComponentProps {
    className?: string;
    block?: ArtcileBlockCode;
}

export const ArtcileCodeBlockComponent = (props: ArtcileCodeBlockComponentProps) => {
    const { t } = useTranslation();
    const { className, block } = props;

    return (
        // eslint-disable-next-line i18next/no-literal-string
        <div className={classNames(cls.ArtcileCodeBlockComponent, {}, [className])}>
            {block?.code && <Code text={block.code} />}
        </div>
    );
};
