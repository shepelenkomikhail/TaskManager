import {createContext, useState, type Context, type PropsWithChildren} from 'react';
import type  { ThemeContextType, ThemeType } from './contextTypes';

export const ThemeContext: Context<ThemeContextType> = createContext<ThemeContextType>({
    theme: 'light',
    setTheme: () => {},
});

export function ThemeProvider({ children }: PropsWithChildren<{}>) {
    const [theme, setTheme] = useState<ThemeType>('light');

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export default ThemeProvider;