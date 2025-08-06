import { Suspense, useEffect } from 'react';
import { AppRouter } from 'app/providers/router';
import { classNames } from 'shared/lib/classNames/classNames';
import { Navbar } from 'widgets/Navbar';
import { Sidebar } from 'widgets/Sidebar';
import { useDispatch, useSelector } from 'react-redux';
import { getAuthUserMounted, userActions } from 'entities/User';

function App() {
    const auth = useSelector(getAuthUserMounted);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(userActions.initAuthData());
    }, [dispatch]);

    return (
        <div className={classNames('app', {}, [])}>
            <Suspense fallback="">
                <Navbar />
                <div className="content-page">
                    {/* <Counter /> */}
                    <Sidebar />
                    {auth && <AppRouter />}
                </div>
            </Suspense>
        </div>
    );
}
export default App;
