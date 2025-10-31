import { RouteProps } from 'react-router-dom';
import { UserRoles } from '@/entities/User';

export type AppRouteProps = RouteProps & {
    authOnly?: boolean;
    roles?: UserRoles[];
};
