import { ReactNode, useEffect, useMemo, useState } from 'react';
import { useJsonSettings } from '@/entities/User';
import { Theme } from '@/shared/const/theme';
import { ThemeContext } from '../../../../shared/lib/context/ThemeContext';

interface ThemeProviderProps {
    initialTheme: Theme;
    children: ReactNode;
}
const ThemeProvider = (props: ThemeProviderProps) => {
    const { initialTheme, children } = props;
    const { theme: defaultTheme } = useJsonSettings();
    const [theme, setTheme] = useState<Theme>(initialTheme || defaultTheme || Theme.LIGHT);
    const [isInitedTheme, setIsInitedTheme] = useState(false);
    useEffect(() => {
        if (!isInitedTheme && defaultTheme) {
            setTheme(defaultTheme);
            setIsInitedTheme(true);
        }
    }, [defaultTheme, initialTheme, isInitedTheme]);
    useEffect(() => {
        document.body.className = theme;
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
