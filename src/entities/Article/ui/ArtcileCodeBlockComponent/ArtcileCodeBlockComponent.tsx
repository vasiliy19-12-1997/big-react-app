import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Code as CodeDeprecated } from '@/shared/ui/redesigned/Code';
import { ArtcileBlockCode } from '../../../Article/model/types/artcile';
import cls from './ArtcileCodeBlockComponent.module.scss';
import { ToggleFeatures } from '@/shared/features';

interface ArtcileCodeBlockComponentProps {
    className?: string;
    block?: ArtcileBlockCode;
}

export const ArtcileCodeBlockComponent = (props: ArtcileCodeBlockComponentProps) => {
    const { t } = useTranslation();
    const { className, block } = props;

    return (
        <ToggleFeatures
            name="isNewDesignEnabled"
            on={
                <div className={classNames(cls.ArtcileCodeBlockComponent, {}, [className])}>
                    {block?.code && <CodeDeprecated text={block.code} />}
                </div>
            }
            off={
                <div className={classNames(cls.ArtcileCodeBlockComponent, {}, [className])}>
                    {block?.code && <CodeDeprecated text={block.code} />}
                </div>
            }
        />
    );
};
