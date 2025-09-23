import { getAuthUserData, getRoleSelector, UserRoles } from 'entities/User';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';

interface RequireAuthProps{
    roles?:UserRoles[];
    children:JSX.Element
}
export function RequireAuth({ roles, children }: RequireAuthProps) {
    const auth = useSelector(getAuthUserData);
    const location = useLocation();
    const allRoles = useSelector(getRoleSelector);

    const hasRequiredRoles = useMemo(() => {
        if (!roles) {
            return true;
        }
        return roles.some((requiredRole) => {
            const hasRole = allRoles?.includes(requiredRole);
            return hasRole;
        });
    }, [allRoles, roles]);

    if (!auth) {
        return <Navigate to={RoutePath.main} state={{ from: location }} replace />;
    }
    if (!hasRequiredRoles) {
        return <Navigate to={RoutePath.forbidden} state={{ from: location }} replace />;
    }
    return children;
}
