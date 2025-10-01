import { classNames } from "shared/lib/classNames/classNames";
import cls from "./NotificationList.module.scss";
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useNotificationList } from "../../api/notificationApi";
import { NotificationItem } from "../NotificationItem/NotificationItem";
import { HStack, VStack } from "shared/ui/Stack";
import { Sceleton } from "shared/ui/Sceleton/Sceleton";

interface NotificationListProps {
  className?: string;
}

export const NotificationList = memo((props: NotificationListProps) => {
  const { t } = useTranslation();
  const { className } = props;
  const {data, isLoading} = useNotificationList(null, {pollingInterval:5000})
  if(isLoading){
  return (
      <VStack gap={16} max className={classNames(cls.NotificationList, {}, [className])}>
        <Sceleton width={400} height={80} border='8%'/>
        <Sceleton width={400} height={80} border='8%'/>
        <Sceleton width={400} height={80} border='8%'/>
      </VStack>
  ) 
  }
  return (
    <VStack gap={16} max className={classNames(cls.NotificationList, {}, [className])}>
      {data?.map((item, index)=>(
        <NotificationItem item={item} key={item.id}/>
      ))}
    </VStack>
  );
});
