import React from 'react';
import { Check } from 'lucide-react';
import { themePresets } from '../../themes/themeConfig';

const ThemeSelector = ({ currentThemeId, onSelect }) => {
    return (
        <div className="grid grid-cols-2 gap-3">
            {Object.values(themePresets).map((theme) => {
                const isActive = currentThemeId === theme.id;

                const bgStyle = theme.background.type === 'gradient'
                    ? { backgroundImage: theme.background.value }
                    : { backgroundColor: theme.background.color };

                return (
                    <button
                        key={theme.id}
                        onClick={() => onSelect(theme.id)}
                        className={`
                            relative flex flex-col group text-left 
                            rounded-xl border-2 transition-all p-2
                            ${isActive ? 'border-primary-600 bg-primary-50/10' : 'border-zinc-100 bg-white hover:border-zinc-300'}
                        `}
                    >
                        {/* Theme Preview Card */}
                        <div
                            className="w-full aspect-[4/3] rounded-lg mb-2 overflow-hidden flex items-center justify-center p-3"
                            style={bgStyle}
                        >
                            <div
                                className="w-full h-4 rounded-md shadow-sm"
                                style={{
                                    backgroundColor: theme.card.backgroundColor,
                                    border: theme.card.border
                                }}
                            />
                        </div>

                        <div className="px-1">
                            <span className="text-[11px] font-black uppercase tracking-tight text-zinc-900 leading-none">
                                {theme.name}
                            </span>
                        </div>

                        {isActive && (
                            <div className="absolute top-1 right-1 w-5 h-5 bg-primary-600 text-white rounded-full flex items-center justify-center">
                                <Check size={12} strokeWidth={3} />
                            </div>
                        )}
                    </button>
                );
            })}
        </div>
    );
};

export default ThemeSelector;
