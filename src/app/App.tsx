import { Suspense, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { AppRouter } from './providers/router';
import { getAuthUserMounted, initedAuthData } from '@/entities/User';
import { classNames } from '@/shared/lib/classNames/classNames';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Navbar } from '@/widgets/Navbar';
import { Sidebar } from '@/widgets/Sidebar';
import { PageLoader } from '@/shared/ui/PageLoader';

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
        <div className={classNames('app', {}, [])}>
            <Suspense fallback="">
                <Navbar />
                <div className="content-page">
                    <Sidebar />
                    {auth && <AppRouter />}
                </div>
            </Suspense>
        </div>
    );
}
export default App;
