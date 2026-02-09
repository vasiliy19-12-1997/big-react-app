import { memo } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './DetailsContainer.module.scss';
import { ArtcileDetails } from '@/entities/Article';
import { Card } from '@/shared/ui/redesigned/Card';

interface DetailsContainerProps {
    className?: string;
}

export const DetailsContainer = memo((props: DetailsContainerProps) => {
    const { t } = useTranslation();
    const { className } = props;
    const { id } = useParams<{ id?: string }>();
    return (
        <Card max border="round" padding="24" className={classNames(cls.DetailsContainer, {}, [className])}>
            <ArtcileDetails id={id} />
        </Card>
    );
});
