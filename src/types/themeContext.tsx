import {createContext, useState, type Context, type PropsWithChildren, useMemo} from 'react';
import type  { ThemeContextType, ThemeType } from './contextTypes';

export const ThemeContext: Context<ThemeContextType> = createContext<ThemeContextType>({
    theme: 'light',
    setTheme: () => {},
});

export function ThemeProvider({ children }: PropsWithChildren<{}>) {
    const [theme, setTheme] = useState<ThemeType>('light');
    const value = useMemo(() => ({ theme, setTheme }), [theme]);

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    );
}

export default ThemeProvider;