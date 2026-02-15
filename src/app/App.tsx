import { Suspense, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getAuthUserMounted, initedAuthData } from '@/entities/User';
import { ToggleFeatures } from '@/shared/features';
import { AppLoaderLayout } from '@/shared/layouts/AppLoaderLayout';
import { MainLayout } from '@/shared/layouts/MainLayout';
import { classNames } from '@/shared/lib/classNames/classNames';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Navbar } from '@/widgets/Navbar';
import { Sidebar } from '@/widgets/Sidebar';
import { AppRouter } from './providers/router';
import { PageLoader } from '@/shared/ui/deprecated/PageLoader';

function App() {
    const auth = useSelector(getAuthUserMounted);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!auth) {
            dispatch(initedAuthData());
        }
    }, [auth, dispatch]);

    if (!auth) {
        return (
            <ToggleFeatures
                name="isNewDesignEnabled"
                on={
                    <div id="app" className={classNames('app_redesign', {}, [])}>
                        <AppLoaderLayout />
                    </div>
                }
                off={<PageLoader />}
            />
        );
    }
    return (
        <ToggleFeatures
            name="isNewDesignEnabled"
            on={
                <div id="app" className={classNames('app_redesign', {}, [])}>
                    <Suspense fallback="">
                        <MainLayout
                            header={<Navbar />}
                            content={<AppRouter />}
                            sidebar={<Sidebar />}
                            // eslint-disable-next-line i18next/no-literal-string
                            toolbar={<div>Toolbar Content</div>}
                        />
                    </Suspense>
                </div>
            }
            off={
                <div id="app" className={classNames('app', {}, [])}>
                    <Suspense fallback="">
                        <Navbar />
                        <div className="content-page">
                            <Sidebar />
                            <AppRouter />
                        </div>
                    </Suspense>
                </div>
            }
        />
    );
}
export default App;
