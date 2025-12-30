import { screen } from '@testing-library/react';
import { getRouteAdmin, getRouteArticle, getRouteMain, getRouteProfile } from '@/shared/const/router';
import { componentRender } from '@/shared/lib/tests/componentRender/componentRender';
import AppRouter from './AppRouter';
import { UserRoles } from '@/entities/User';

describe('app/router/ui/AppRouter.test.tsx', () => {
    test('Должна отрисоваться страница MainPage', async () => {
        componentRender(<AppRouter />, {
            route: getRouteMain(),
        });
        const page = await screen.findByTestId('MainPage');
        expect(page).toBeInTheDocument();
    });

    test('Должна отрисоваться страница NotFoundPage', async () => {
        componentRender(<AppRouter />, {
            route: '/dsdsdsd',
        });
        const page = await screen.findByTestId('NotFoundPage');
        expect(page).toBeInTheDocument();
    });

    test('Должно редиректнуть на MainPage неавторизованного пользователя', async () => {
        componentRender(<AppRouter />, {
            route: getRouteArticle(),
        });
        const page = await screen.findByTestId('MainPage');
        expect(page).toBeInTheDocument();
    });

    test('Должно редиректнуть на ForbidenPage неавторизованного пользователя', async () => {
        componentRender(<AppRouter />, {
            route: getRouteAdmin(),
        });
        const page = await screen.findByTestId('ForbiddenPage');
        expect(page).toBeInTheDocument();
    });

    test('Должно отрисовать AdminPanelPage авторизованного пользователя', async () => {
        componentRender(<AppRouter />, {
            route: getRouteAdmin(),
            initialState: { user: { _mounted: true, authData: { roles: [UserRoles.ADMIN] } } },
        });
        const page = await screen.findByTestId('AdminPanelPage');
        expect(page).toBeInTheDocument();
    });
    test('Должно отрисоваться страница ArticlePage', async () => {
        componentRender(<AppRouter />, {
            route: getRouteProfile('2'),
            initialState: { user: { _mounted: true, authData: { roles: [UserRoles.USER] } } },
        });
        const page = await screen.findByTestId('ProfilePage');
        expect(page).toBeInTheDocument();
    });
});
