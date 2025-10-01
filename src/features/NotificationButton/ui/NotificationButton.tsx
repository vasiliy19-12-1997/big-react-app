import { NotificationList } from "entities/Notification"
import { Button, ButtonTheme } from "shared/ui/Button/Button"
import { Icon } from "shared/ui/Icon/Icon"
import { PopOver } from "shared/ui/Popups"
import NotificationIcon from 'shared/assets/icons/notification-20-20.svg'
import cls from './NotificationButton.module.scss'
export const NotificationButton = ()=>{
    return (
         <PopOver className={cls.one}
                        direction="bottom left"
                        trigger={(
                            <Button theme={ButtonTheme.CLEAR} className={cls.notification}>
                                <Icon Svg={NotificationIcon} inverted />
                            </Button>
                        )}
                    >
                        <NotificationList className={cls.notifications}/>
    </PopOver>
    )
    
}