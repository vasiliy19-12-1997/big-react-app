import { matchPath, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { AppRouteByPathPattern, AppRoutes } from '@/shared/const/router';

export const useRouteChange = () => {
    const location = useLocation();
    const [appRoute, setAppRoute] = useState<AppRoutes>(AppRoutes.MAIN);

    useEffect(() => {
        Object.entries(AppRouteByPathPattern).forEach(([path, route]) => {
            if (matchPath(path, location.pathname)) {
                setAppRoute(route);
            }
        });
    }, [location.pathname]);
    return appRoute;
};
