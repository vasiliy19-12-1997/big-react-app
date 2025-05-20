import React, { Suspense, useEffect, useState } from 'react';
import './styles/index.scss';
import { classNames } from 'shared/lib/classNames/classNames';
import { useTheme } from 'app/providers/ThemeProvider';
import { AppRouter } from 'app/providers/router';
import { Navbar } from 'widgets/Navbar';
import { Sidebar } from 'widgets/Sidebar';
import { Modal } from '../shared/ui/Modal/Modal';

function App() {
    const { theme } = useTheme();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className={classNames('app', {}, [theme])}>

            <Suspense fallback="">
                <Navbar />
                <button onClick={() => setIsOpen(true)}>toggle modal</button>
                <Modal onClose={() => setIsOpen(false)} isOpen={isOpen}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis nobis assumenda distinctio unde molestiae quas debitis aperiam quibusdam officiis illum expedita, tempore quos at enim possimus cupiditate soluta, doloremque ipsam?
                </Modal>
                <div className="content-page">
                    <Sidebar />
                    <AppRouter />
                </div>
            </Suspense>
        </div>
    );
}

export default App;
