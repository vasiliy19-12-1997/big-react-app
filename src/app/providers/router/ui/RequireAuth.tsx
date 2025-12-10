import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { getRouteForbidden, getRouteMain } from '@/shared/const/router';
import { getAuthUserData, getRoleSelector, UserRoles } from '@/entities/User';

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
    if (!hasRequiredRoles) {
        return <Navigate to={getRouteForbidden()} state={{ from: location }} replace />;
    }
    if (!auth) {
        return <Navigate to={getRouteMain()} state={{ from: location }} replace />;
    }

    return children;
}
