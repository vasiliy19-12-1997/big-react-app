import { classNames } from "shared/lib/classNames/classNames";
import cls from "./ArtcileTextBlockComponent.module.scss";

import { useTranslation } from 'react-i18next';

interface ArtcileTextBlockComponentProps {
  className?: string;
}

export const ArtcileTextBlockComponent = (props: ArtcileTextBlockComponentProps) => {
  const { t } = useTranslation();
  const { className } = props;

  return (
    <div className={classNames(cls.ArtcileTextBlockComponent, {}, [className])}>
    </div>
  );
};
