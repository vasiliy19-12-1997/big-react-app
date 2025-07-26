import { classNames } from "shared/lib/classNames/classNames";
import cls from "./ArtcileCodeBlockComponent.module.scss";

import { useTranslation } from 'react-i18next';

interface ArtcileCodeBlockComponentProps {
  className?: string;
}

export const ArtcileCodeBlockComponent = (props: ArtcileCodeBlockComponentProps) => {
  const { t } = useTranslation();
  const { className } = props;

  return (
    <div className={classNames(cls.ArtcileCodeBlockComponent, {}, [className])}>
    </div>
  );
};
