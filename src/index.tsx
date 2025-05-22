import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Theme, ThemeProvider } from 'app/providers/ThemeProvider';
import App from './app/App';
import 'app/styles/index.scss';
import './shared/config/i18n/i18n';
import { ErrorBoundary } from './app/providers/ErrorBoundary';

render(
    <BrowserRouter>
        <ErrorBoundary>
            <ThemeProvider initialTheme={Theme.LIGHT}>
                <App />
            </ThemeProvider>
        </ErrorBoundary>
    </BrowserRouter>,
    document.getElementById('root'),
);
