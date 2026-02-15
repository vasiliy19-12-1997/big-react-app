import { ReactElement } from 'react';
import { AppRoutes } from '@/shared/const/router';
import { ScrollToolbar } from '@/widgets/ScrollToolbar';
import { useRouteChange } from '@/shared/lib/router/useRouteChange';

export const useAppToolbar = () => {
    const appRoute = useRouteChange();

    const toolbarByAppRoutes: OptionalRecord<AppRoutes, ReactElement> = {
        [AppRoutes.ARTICLE]: <ScrollToolbar />,
        [AppRoutes.ARTICLE_DETAILS]: <ScrollToolbar />,
        [AppRoutes.MAIN]: <div>toolbar main</div>,
        [AppRoutes.ABOUT]: <div>toolbar about</div>,
    };
    return toolbarByAppRoutes[appRoute];
};
