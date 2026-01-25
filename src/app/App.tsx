import { Suspense, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getAuthUserMounted, initedAuthData, useJsonSettings } from '@/entities/User';
import { ToggleFeatures } from '@/shared/features';
import { classNames } from '@/shared/lib/classNames/classNames';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { PageLoader } from '@/shared/ui/PageLoader';
import { Navbar } from '@/widgets/Navbar';
import { Sidebar } from '@/widgets/Sidebar';
import { AppRouter } from './providers/router';
import { MainLayout } from '@/shared/layouts/MainLayout';

function App() {
    const auth = useSelector(getAuthUserMounted);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(initedAuthData());
    }, [dispatch]);

    if (!auth) {
        return <PageLoader />;
    }

    return (
        <ToggleFeatures
            name="isNewDesignEnabled"
            on={
                <div className={classNames('app_redesign', {}, [])}>
                    <Suspense fallback="">
                        <Navbar />
                        <div className="content-page">
                            <Sidebar />
                            <AppRouter />
                        </div>
                    </Suspense>
                </div>
            }
            off={
                <div className={classNames('app', {}, [])}>
                    <MainLayout header={<Navbar />} content={<AppRouter />} sidebar={<Sidebar />} />
                    <Suspense fallback="">
                        <Navbar />
                        <div className="content-page"></div>
                    </Suspense>
                </div>
            }
        />
    );
}
export default App;
