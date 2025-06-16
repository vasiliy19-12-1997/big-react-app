import { classNames } from "shared/lib/classNames/classNames";
import cls from "./ProfileCard.module.scss";
import { useTranslation } from 'react-i18next';
import { getProfileData } from "entities/Profile/model/selectors/getProfileData/getProfileData";
import { useSelector } from "react-redux";
import { getProfileIsLoading } from "entities/Profile/model/selectors/getProfileIsLoading/getProfileIsLoading";
import { getProfileError } from "entities/Profile/model/selectors/getProfileError/getProfileError";
import { Text } from "shared/ui/Text/Text";
import { Button, ButtonTheme } from "shared/ui/Button/Button";
import { Input } from "shared/ui/Input/Input";

interface ProfileCardProps {
  className?: string;
}

export const ProfileCard = (props: ProfileCardProps) => {
const { t } = useTranslation();
  const {  
        className,
  } = props;
  const data = useSelector(getProfileData)
  const isLoading = useSelector(getProfileIsLoading)
  const error = useSelector(getProfileError)

  return (
    <div className={classNames(cls.ProfileCard, {}, [className])}>
        <div className={cls.header}>
            <Text title={t('Профиль пользователя')}/>
            <Button className={cls.editBtn} theme={ButtonTheme.OUTLINE}>{t('Редактировать')}</Button>
        </div>
        <div className={cls.data}>
            <Input value={data?.first}
            placeholder={t('Выше имя')}
            className={cls.input}
            />
            <Input value={data?.lastname}
            placeholder={t('Выше фамилия')}
            className={cls.input}
            />
        </div>
    </div>
  );
};