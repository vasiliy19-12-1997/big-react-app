import { RouteProps } from 'react-router-dom';
// eslint-disable-next-line big-react-app-plugin/layer-imports
import { UserRoles } from '@/entities/User';

export type AppRouteProps = RouteProps & {
    authOnly?: boolean;
    roles?: UserRoles[];
};
