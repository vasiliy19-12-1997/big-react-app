import { BrowserRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client';

import App from '@/app/App';
import { ErrorBoundary } from '@/app/providers/ErrorBoundary';
import { StoreProvider } from '@/app/providers/StoreProvider';
import { ThemeProvider, Theme } from '@/app/providers/ThemeProvider';
import '@/app/styles/index.scss';
import '@/shared/config/i18n/i18n';

const container = document.getElementById('root');
if (!container) {
    throw new Error('Нету элемента с id:root');
}
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(
    <BrowserRouter>
        <StoreProvider>
            <ErrorBoundary>
                <ThemeProvider initialTheme={Theme.LIGHT}>
                    <App />
                </ThemeProvider>
            </ErrorBoundary>
        </StoreProvider>
    </BrowserRouter>,
);
