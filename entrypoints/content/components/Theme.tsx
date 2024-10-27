import React, { useState, useEffect } from 'react';
import Button from "./ui/Button";
import { Sun, Moon, Monitor } from 'lucide-react';

// Dark mode switcher WIP

const Theme = () => {
    const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'system');

    useEffect(() => {
        localStorage.setItem('theme', theme);
        applyTheme(theme);
    }, [theme]);

    const applyTheme = (theme: string) => {
        const root = document.documentElement;
        root.classList.remove('light', 'dark', 'system');
        root.classList.add(theme);
    };
 
    const toggleTheme = () => {
        setTheme(prevTheme => {
            if (prevTheme === 'system') return 'light';
            if (prevTheme === 'light') return 'dark';
            return 'system';
        });
    };

    const renderIcon = () => {
        if (theme === 'light') return <Sun />;
        if (theme === 'dark') return <Moon />;
        return <Monitor />;
    };

    return (
        <div>
            <Button
                variant="secondary"
                size="small"
                onClick={toggleTheme}
            >
                {renderIcon()}
            </Button>
        </div>
    );
};

export default Theme;