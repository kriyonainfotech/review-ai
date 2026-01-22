import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { defaultTheme, themePresets, shadowPresets } from './themeConfig';

const ThemeContext = createContext();

export const ThemeProvider = ({ children, initialThemeId = 'clean_white', customOverrides = null }) => {
    const [themeId, setThemeId] = useState(initialThemeId);
    const [overrides, setOverrides] = useState(customOverrides);

    // Get the base theme preset
    const baseTheme = useMemo(() => themePresets[themeId] || defaultTheme, [themeId]);

    // Merge preset with overrides
    const theme = useMemo(() => {
        if (!overrides) return baseTheme;

        // Deep merge logic for button and fonts
        return {
            ...baseTheme,
            ...overrides,
            button: {
                ...(baseTheme.button || {}),
                ...(overrides.button || {}),
            },
            fonts: {
                ...(baseTheme.fonts || {}),
                ...(overrides.fonts || {}),
            },
            background: {
                ...(baseTheme.background || {}),
                ...(overrides.background || {}),
            }
        };
    }, [baseTheme, overrides]);

    // Sync with props for real-time updates (especially for preview)
    useEffect(() => {
        setThemeId(initialThemeId);
    }, [initialThemeId]);

    useEffect(() => {
        setOverrides(customOverrides);
    }, [customOverrides]);

    // Generate CSS variables for local scoping
    const cssVars = useMemo(() => {
        const button = theme.button || {};
        const bg = theme.background || {};
        const fonts = theme.fonts || {};

        const vars = {
            '--theme-font-title': fonts.title || theme.fontFamily || 'unset',
            '--theme-font-body': fonts.body || theme.fontFamily || 'unset',
            '--accent-color': theme.accentColor,

            // Button/Card Variables
            '--btn-bg': button.backgroundColor || 'white',
            '--btn-text': button.textColor || 'black',
            '--btn-radius': button.borderRadius || '8px',
            '--btn-shadow': shadowPresets[button.shadow] || button.shadow || 'none',
            '--btn-border': button.border || 'none',
            '--btn-blur': button.style === 'glass' ? '12px' : '0px',
            '--btn-opacity': button.style === 'glass' ? '0.1' : '1',

            // Global Text Variables (for background contrast)
            '--theme-text-primary': theme.titleColor || button.textColor || 'black',
            '--theme-text-secondary': theme.textColor || button.textColor || 'black',
        };

        if (bg.type === 'solid') {
            vars['--theme-bg'] = bg.color;
            vars['--theme-bg-gradient'] = 'none';
        } else if (bg.type === 'gradient') {
            vars['--theme-bg-gradient'] = bg.value;
            vars['--theme-bg-size'] = bg.size || 'auto';
            vars['--theme-bg'] = bg.color || 'transparent';
        }

        return vars;
    }, [theme]);

    const value = {
        theme,
        themeId,
        setThemeId,
        setOverrides,
        presets: themePresets
    };

    return (
        <ThemeContext.Provider value={value}>
            <div
                className="theme-scope min-h-full w-full"
                style={{ ...cssVars, color: 'var(--theme-text-primary)' }}
            >
                {children}
            </div>
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};
