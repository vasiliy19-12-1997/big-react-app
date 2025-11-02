import {
    memo, Suspense, useCallback,
} from 'react';
import { Route, Routes } from 'react-router-dom';
import { routeConfig } from '../../router/config/routeConfig';
import { AppRouteProps } from '@/shared/types/routerTypes';
import { PageLoader } from '@/shared/ui/PageLoader/PageLoader';
import { RequireAuth } from './RequireAuth';

const AppRouter = memo(() => {
    const renderWithWrapper = useCallback((route:AppRouteProps) => {
        const element = (
            <Suspense fallback={<PageLoader />}>
                {route.element}
            </Suspense>
        );
        return (
            <Route
                key={route.path}
                path={route.path}
                element={route.authOnly ? <RequireAuth roles={route.roles}>{element}</RequireAuth> : element}
            />
        );
    }, []);
    return (
        <Routes>
            {
                Object.values(routeConfig).map(renderWithWrapper)
            }
        </Routes>
    );
});

export default AppRouter;
