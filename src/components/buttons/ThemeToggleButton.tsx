import {useContext} from "react";
import IconButton from '@mui/material/IconButton';
import type {ThemeContextType} from "../../types/contextTypes.ts";
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import {ThemeContext} from "../../types/themeContext.tsx";

function ThemeToggleButton(){
    const { theme, setTheme } : ThemeContextType = useContext<ThemeContextType>(ThemeContext);

    const handleClick = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark');
        console.log("Current theme:", theme);
    };

    console.log("Current theme:", theme);

    return (
        <IconButton
            color="inherit"
            onClick={handleClick}
            aria-label="toggle theme"
        >
            {theme === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
        </IconButton>
    );
}

export default ThemeToggleButton;