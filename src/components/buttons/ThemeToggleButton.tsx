import {useContext} from "react";
import IconButton from '@mui/material/IconButton';
import type {ThemeContextType} from "../../types/contextTypes.ts";
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import {ThemeContext} from "../../types/themeContext.tsx";
import React from "react";

function ThemeToggleButton(){
    const { theme, setTheme } : ThemeContextType = useContext<ThemeContextType>(ThemeContext);

    const handleClick = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark');
    };

    console.log("Current theme:", theme);

    return (
        <IconButton color="inherit" onClick={handleClick} sx={{width: 40, height: 40}}>
            {theme === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
        </IconButton>
    );
}

export default React.memo(ThemeToggleButton);