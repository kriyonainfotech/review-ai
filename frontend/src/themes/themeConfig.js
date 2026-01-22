export const themePresets = {
    clean_white: {
        id: 'clean_white',
        name: 'Clean White',
        type: 'customizable',
        background: { type: 'solid', color: '#f9f9fb' },
        button: {
            style: 'glass',
            backgroundColor: 'rgba(255, 255, 255, 0.4)',
            textColor: '#111827',
            borderRadius: '12px',
            shadow: 'soft',
            border: '1px solid rgba(255, 255, 255, 0.5)'
        },
        accentColor: '#3b82f6',
        textColor: '#4b5563',
        titleColor: '#111827',
        fonts: {
            title: "'Inter', sans-serif",
            body: "'Inter', sans-serif",
            size: 'medium'
        }
    },

    air: {
        id: 'air',
        name: 'Air',
        type: 'curated',
        background: { type: 'solid', color: '#ffffff' },
        button: {
            style: 'glass',
            backgroundColor: 'rgba(255, 255, 255, 0.4)',
            textColor: '#000000',
            borderRadius: '30px',
            shadow: 'none',
            border: '1px solid #000000'
        },
        accentColor: '#000000',
        textColor: '#4b5563',
        titleColor: '#000000',
        fonts: {
            title: "'Outfit', sans-serif",
            body: "'Outfit', sans-serif",
            size: 'medium'
        }
    },

    midnight_vision: {
        id: 'midnight_vision',
        name: 'Midnight Vision',
        type: 'curated',
        background: { type: 'solid', color: '#0F0F0F' },
        button: {
            style: 'glass',
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            textColor: '#ffffff',
            borderRadius: '999px',
            shadow: 'none',
            border: '1px solid rgba(255, 255, 255, 0.1)'
        },
        accentColor: '#ffffff',
        textColor: 'rgba(255, 255, 255, 0.7)',
        titleColor: '#ffffff',
        fonts: {
            title: "'Outfit', sans-serif",
            body: "'Inter', sans-serif",
            size: 'medium'
        }
    },

    linen_serenity: {
        id: 'linen_serenity',
        name: 'Linen Serenity',
        type: 'premium',
        background: { type: 'solid', color: '#B5B5A1' },
        button: {
            style: 'glass',
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            textColor: '#2D3436',
            borderRadius: '999px',
            shadow: 'none',
            border: '1px solid rgba(255, 255, 255, 0.3)'
        },
        accentColor: '#2D3436',
        textColor: '#404547',
        titleColor: '#2D3436',
        fonts: {
            title: "'Lora', serif",
            body: "'Inter', sans-serif",
            size: 'medium'
        }
    },

    luxury_dark: {
        id: 'luxury_dark',
        name: 'Luxury Dark',
        type: 'premium',
        background: { type: 'solid', color: '#121212' },
        button: {
            style: 'glass',
            backgroundColor: 'rgba(212, 175, 55, 0.05)', // Gold tint
            textColor: '#D4AF37',
            borderRadius: '8px',
            shadow: 'soft',
            border: '1px solid rgba(212, 175, 55, 0.3)'
        },
        accentColor: '#D4AF37',
        textColor: '#A0A0A0',
        titleColor: '#D4AF37',
        fonts: {
            title: "'Playfair Display', serif",
            body: "'Inter', sans-serif",
            size: 'medium'
        }
    },

    neo_brutalism: {
        id: 'neo_brutalism',
        name: 'Neo Brutalism',
        type: 'curated',
        background: { type: 'solid', color: '#F3F705' },
        button: {
            style: 'glass', // Still using solid style logic but with low opacity color
            backgroundColor: 'rgba(255, 0, 255, 0.15)',
            textColor: '#000000',
            borderRadius: '0px',
            shadow: 'hard',
            border: '3px solid #000000'
        },
        accentColor: '#000000',
        textColor: '#000000',
        titleColor: '#000000',
        fonts: {
            title: "'Space Grotesk', sans-serif",
            body: "'Space Grotesk', sans-serif",
            size: 'medium'
        }
    },

    oceanic_glass: {
        id: 'oceanic_glass',
        name: 'Oceanic Glass',
        type: 'curated',
        background: {
            type: 'gradient',
            value: 'linear-gradient(135deg, #0f172a 0%, #1e3a8a 100%)'
        },
        button: {
            style: 'glass',
            backgroundColor: 'rgba(255, 255, 255, 0.08)',
            textColor: '#FFFFFF',
            borderRadius: '24px',
            shadow: 'soft',
            border: '1px solid rgba(255, 255, 255, 0.15)'
        },
        accentColor: '#38bdf8',
        textColor: 'rgba(255, 255, 255, 0.8)',
        titleColor: '#FFFFFF',
        fonts: {
            title: "'Outfit', sans-serif",
            body: "'Outfit', sans-serif",
            size: 'medium'
        }
    },

    modern_grid: {
        id: 'modern_grid',
        name: 'Modern Grid',
        type: 'curated',
        background: {
            type: 'gradient',
            value: 'linear-gradient(rgba(0,0,0,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.05) 1px, transparent 1px)',
            size: '20px 20px',
            color: '#f8fafc'
        },
        button: {
            style: 'glass',
            backgroundColor: 'rgba(255, 255, 255, 0.7)',
            textColor: '#0f172a',
            borderRadius: '12px',
            shadow: 'soft',
            border: '1px solid rgba(0, 0, 0, 0.1)'
        },
        accentColor: '#3b82f6',
        textColor: '#64748b',
        titleColor: '#0f172a',
        fonts: {
            title: "'Space Grotesk', sans-serif",
            body: "'Inter', sans-serif",
            size: 'medium'
        }
    }
};

export const defaultTheme = themePresets.clean_white;

// Helper variables for mapping
export const shadowPresets = {
    none: 'none',
    soft: '0 4px 12px rgba(0, 0, 0, 0.05)',
    strong: '0 8px 30px rgba(0, 0, 0, 0.12)',
    hard: '4px 4px 0px rgba(0, 0, 0, 1)'
};

export const radiusPresets = {
    square: '0px',
    rounded: '12px',
    pill: '9999px'
};

export const fontOptions = [
    { name: 'Classic Sans', value: "'Inter', sans-serif" },
    { name: 'Modern Sans', value: "'Outfit', sans-serif" },
    { name: 'Bold Grotesk', value: "'Space Grotesk', sans-serif" },
    { name: 'Elegant Serif', value: "'Lora', serif" },
    { name: 'Premium Serif', value: "'Playfair Display', serif" },
    { name: 'Display Black', value: "'Archivo Black', sans-serif" },
    { name: 'Playful', value: "'Quicksand', sans-serif" }
];
