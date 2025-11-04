export type ThemeType = 'light' | 'dark';

export type ThemeContextType = {
    theme: ThemeType;
    setTheme: (theme: ThemeType) => void;
};
