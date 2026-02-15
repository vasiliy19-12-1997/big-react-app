import { Suspense, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getAuthUserMounted, initedAuthData } from '@/entities/User';
import { ToggleFeatures } from '@/shared/features';
import { AppLoaderLayout } from '@/shared/layouts/AppLoaderLayout';
import { MainLayout } from '@/shared/layouts/MainLayout';
import { classNames } from '@/shared/lib/classNames/classNames';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { PageLoader } from '@/shared/ui/deprecated/PageLoader';
import { Navbar } from '@/widgets/Navbar';
import { Sidebar } from '@/widgets/Sidebar';
import { useAppToolbar } from './lib/useAppToolbar';
import { AppRouter } from './providers/router';

function App() {
    const auth = useSelector(getAuthUserMounted);
    const dispatch = useAppDispatch();
    const toolbar = useAppToolbar();
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
                            toolbar={toolbar}
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
