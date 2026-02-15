import { ReactNode, useEffect, useMemo, useState } from 'react';
import { useJsonSettings } from '@/entities/User';
import { Theme } from '@/shared/const/theme';
import { ThemeContext } from '../../../../shared/lib/context/ThemeContext';
import { LOCAL_STORAGE_THEME_KEY } from '@/shared/const/localstorage';

interface ThemeProviderProps {
    initialTheme: Theme;
    children: ReactNode;
}

const ThemeProvider = (props: ThemeProviderProps) => {
    const { initialTheme, children } = props;

    const { theme: defaultTheme } = useJsonSettings();
    const [isInitedTheme, setIsInitedTheme] = useState(false);
    const [theme, setTheme] = useState<Theme>(() => {
        const storedTheme = localStorage.getItem(LOCAL_STORAGE_THEME_KEY) as Theme;
        return storedTheme || initialTheme || Theme.LIGHT;
    });
    useEffect(() => {
        if (!isInitedTheme && defaultTheme) {
            setTheme(defaultTheme);
            setIsInitedTheme(true);
        }
    }, [defaultTheme, initialTheme, isInitedTheme]);

    useEffect(() => {
        document.body.className = theme;
        localStorage.setItem(LOCAL_STORAGE_THEME_KEY, theme);
        console.log('Theme changed:', theme);
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
