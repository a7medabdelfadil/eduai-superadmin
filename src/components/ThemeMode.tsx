"use client";
import classNames from 'classnames';
import { ThemeProvider } from 'next-themes';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

function ThemeMode({ children }: { children: React.ReactNode }) {
    const reduxTheme = useSelector((state: any) => state.theme.theme);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (reduxTheme === true) {
            document.documentElement.classList.add('dark');
            document.documentElement.style.colorScheme = 'dark';
        } else {
            document.documentElement.removeAttribute("class")
            document.documentElement.style.colorScheme = 'light';
        }
    }, [reduxTheme]);

    if (!mounted) return null;

    return (
        <ThemeProvider
            defaultTheme={reduxTheme ? "dark" : "light"}
        >
            {children}
        </ThemeProvider>
    );
}

export default ThemeMode;