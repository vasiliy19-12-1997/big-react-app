import { classNames } from "shared/lib/classNames/classNames";
import cls from "./Card.module.scss";
import { memo } from 'react';
import { useTranslation } from 'react-i18next';

interface CardProps {
  className?: string;
}

export const Card = memo((props: CardProps) => {
  const { t } = useTranslation();
  const { className } = props;

  return (
    <div className={classNames(cls.Card, {}, [className])}>
    </div>
  );
});
