import { BrowserRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client';

import App from '@/app/App';
import { ErrorBoundary } from '@/app/providers/ErrorBoundary';
import { StoreProvider } from '@/app/providers/StoreProvider';
import '@/app/styles/index.scss';
import '@/shared/config/i18n/i18n';
import { ThemeProvider } from './app/providers/ThemeProvider';
import { Theme } from './shared/const/theme';
import { ForceUpdateProvider } from './shared/render/forceUpdate';

const container = document.getElementById('root');
if (!container) {
    throw new Error('Нету элемента с id:root');
}
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(
    <BrowserRouter>
        <StoreProvider>
            <ErrorBoundary>
                {/* костыль чтобы обновилась тема при смене юзера, в реальных проектах лучше не юзать */}
                <ForceUpdateProvider>
                    <ThemeProvider initialTheme={Theme.LIGHT}>
                        <App />
                    </ThemeProvider>
                </ForceUpdateProvider>
            </ErrorBoundary>
        </StoreProvider>
    </BrowserRouter>,
);
