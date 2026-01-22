import React from 'react';

const CustomizationPanel = ({ config, onChange }) => {
    // Utility to handle nested changes
    const handleChange = (section, field, value) => {
        onChange({
            ...config,
            [section]: {
                ...config[section],
                [field]: value
            }
        });
    };

    return (
        <div className="space-y-6">
            {/* Background Customization */}
            <div className="space-y-3">
                <h3 className="text-xs font-black uppercase tracking-widest text-zinc-500">Background</h3>
                <div className="flex items-center gap-3 bg-white p-3 rounded-xl border border-zinc-100">
                    <div className="flex-1 space-y-1">
                        <span className="text-[11px] font-bold text-zinc-900">Color</span>
                        <input
                            type="color"
                            value={config.background.color || '#ffffff'}
                            onChange={(e) => handleChange('background', 'color', e.target.value)}
                            className="w-full h-8 rounded cursor-pointer"
                        />
                    </div>
                </div>
            </div>

            {/* Card Customization */}
            <div className="space-y-3">
                <h3 className="text-xs font-black uppercase tracking-widest text-zinc-500">Card Design</h3>
                <div className="space-y-4 bg-white p-4 rounded-xl border border-zinc-100">
                    {/* Border Radius */}
                    <div className="space-y-1.5">
                        <div className="flex items-center justify-between">
                            <span className="text-[11px] font-bold text-zinc-900">Border Radius</span>
                            <span className="text-[11px] font-mono text-zinc-400">{config.card.borderRadius}</span>
                        </div>
                        <input
                            type="range"
                            min="0"
                            max="40"
                            value={parseInt(config.card.borderRadius)}
                            onChange={(e) => handleChange('card', 'borderRadius', `${e.target.value}px`)}
                            className="w-full accent-primary-600 h-1.5 bg-zinc-100 rounded-lg cursor-pointer"
                        />
                    </div>

                    {/* Text Color */}
                    <div className="flex items-center justify-between">
                        <span className="text-[11px] font-bold text-zinc-900">Text Color</span>
                        <input
                            type="color"
                            value={config.card.textColor || '#000000'}
                            onChange={(e) => handleChange('card', 'textColor', e.target.value)}
                            className="w-8 h-8 rounded-lg cursor-pointer border-0"
                        />
                    </div>

                    {/* Card Background */}
                    <div className="flex items-center justify-between">
                        <span className="text-[11px] font-bold text-zinc-900">Card Color</span>
                        <input
                            type="color"
                            value={config.card.backgroundColor || '#ffffff'}
                            onChange={(e) => handleChange('card', 'backgroundColor', e.target.value)}
                            className="w-8 h-8 rounded-lg cursor-pointer border-0"
                        />
                    </div>
                </div>
            </div>

            {/* Accent Customization */}
            <div className="space-y-3">
                <h3 className="text-xs font-black uppercase tracking-widest text-zinc-500">Branding</h3>
                <div className="bg-white p-4 rounded-xl border border-zinc-100">
                    <div className="flex items-center justify-between">
                        <span className="text-[11px] font-bold text-zinc-900">Accent Color</span>
                        <input
                            type="color"
                            value={config.accentColor || '#3b82f6'}
                            onChange={(e) => onChange({ ...config, accentColor: e.target.value })}
                            className="w-8 h-8 rounded-lg cursor-pointer border-0"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CustomizationPanel;
