import { Notification } from "entities/Notification/model/notification";
import { memo } from 'react';
import { classNames } from "shared/lib/classNames/classNames";
import { Card, CardTheme } from "shared/ui/Card/Card";
import { Text } from 'shared/ui/Text/Text';
import cls from "./NotificationItem.module.scss";
interface NotificationItemProps {
  className?: string;
  item:Notification
}

export const NotificationItem = memo((props: NotificationItemProps) => {
  const { className, item } = props;
const content = <Card className={classNames(cls.NotificationItem, {}, [className])} theme={CardTheme.OUTLINED}>
  <Text title={item.title} text={item.description} />
</Card>

if(item.href){
  <a href={item.href} target="_blank" className={cls.links}>
    {content}
  </a>
}
  return (
    content
  )
});
