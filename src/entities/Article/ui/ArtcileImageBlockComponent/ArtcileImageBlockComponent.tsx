import { classNames } from "shared/lib/classNames/classNames";
import cls from "./ArtcileImageBlockComponent.module.scss";

import { useTranslation } from 'react-i18next';

interface ArtcileImageBlockComponentProps {
  className?: string;
}

export const ArtcileImageBlockComponent = (props: ArtcileImageBlockComponentProps) => {
  const { t } = useTranslation();
  const { className } = props;

  return (
    <div className={classNames(cls.ArtcileImageBlockComponent, {}, [className])}>
    </div>
  );
};
