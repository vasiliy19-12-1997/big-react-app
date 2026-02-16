import { ReactNode, useEffect, useMemo, useState } from 'react';
import { LOCAL_STORAGE_THEME_KEY } from '@/shared/const/localstorage';
import { Theme } from '@/shared/const/theme';
import { ThemeContext } from '../../../../shared/lib/context/ThemeContext';

interface ThemeProviderProps {
    initialTheme?: Theme;
    children: ReactNode;
}

const ThemeProvider = (props: ThemeProviderProps) => {
    const { initialTheme, children } = props;

    const [isInitedTheme, setIsInitedTheme] = useState(false);
    const [theme, setTheme] = useState<Theme>(() => {
        const storedTheme = localStorage.getItem(LOCAL_STORAGE_THEME_KEY) as Theme;
        return storedTheme || initialTheme || Theme.LIGHT;
    });
    useEffect(() => {
        if (!isInitedTheme && initialTheme) {
            setTheme(initialTheme);
            setIsInitedTheme(true);
        }
    }, [initialTheme, isInitedTheme]);

    useEffect(() => {
        document.body.className = theme;
        localStorage.setItem(LOCAL_STORAGE_THEME_KEY, theme);
    }, [theme]);

    const defaultProps = useMemo(
        () => ({
            theme,
            setTheme,
        }),
        [theme],
    );

    return <ThemeContext.Provider value={defaultProps}>{children}</ThemeContext.Provider>;
};

export default ThemeProvider;
