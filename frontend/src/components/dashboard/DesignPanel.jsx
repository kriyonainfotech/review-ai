import React, { useState } from 'react';
import {
    Layout,
    Palette,
    Type,
    MousePointer2,
    Image as ImageIcon,
    ChevronDown,
    ChevronUp,
    Sparkles,
    Lock
} from 'lucide-react';
import { themePresets, radiusPresets, shadowPresets, fontOptions } from '../../themes/themeConfig';

const DesignSection = ({ id, title, icon: Icon, children, isOpen, onToggle }) => (
    <div className="border-b border-zinc-100 last:border-0">
        <button
            onClick={() => onToggle(id)}
            className="w-full flex items-center justify-between p-6 hover:bg-zinc-50/50 transition-colors group text-left"
        >
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-zinc-50 flex items-center justify-center text-zinc-500 group-hover:text-primary-600 group-hover:bg-primary-50 transition-all">
                    <Icon size={20} />
                </div>
                <div>
                    <h3 className="font-bold text-zinc-900">{title}</h3>
                </div>
            </div>
            {isOpen ? <ChevronUp size={20} className="text-zinc-400" /> : <ChevronDown size={20} className="text-zinc-400" />}
        </button>
        {isOpen && (
            <div className="p-6 pt-0 animate-in fade-in slide-in-from-top-2 duration-300">
                {children}
            </div>
        )}
    </div>
);

const ThemeCard = ({ theme, isActive, onSelect }) => {
    // Determine preview styles
    const button = theme.button || {};
    const bg = theme.background || {};
    const fonts = theme.fonts || {};

    const previewBg = bg.type === 'solid'
        ? { backgroundColor: bg.color }
        : { backgroundImage: bg.value, backgroundSize: bg.size || 'cover' };

    return (
        <button
            onClick={() => onSelect(theme.id)}
            className={`
                relative flex flex-col w-full aspect-[3/4] rounded-2xl overflow-hidden border-2 transition-all group
                ${isActive ? 'border-primary-600 ring-2 ring-primary-600/20 ring-offset-2' : 'border-zinc-100 hover:border-zinc-200'}
            `}
        >
            {/* Background Preview */}
            <div className="flex-1 w-full relative" style={previewBg}>
                {/* Content Preview Mockup */}
                <div className="absolute inset-x-3 top-4 flex flex-col items-center gap-1.5 pt-2">
                    <div className="w-6 h-6 rounded-full bg-white/20 backdrop-blur-sm" />
                    <div className="w-10 h-1.5 rounded-full bg-white/20" />
                </div>

                <div className="absolute inset-x-3 bottom-4 space-y-2">
                    {[1, 2].map((i) => (
                        <div
                            key={i}
                            className="w-full h-8 flex items-center justify-center px-2"
                            style={{
                                backgroundColor: button.backgroundColor,
                                color: button.textColor,
                                borderRadius: button.borderRadius || '4px',
                                border: button.border || 'none',
                                boxShadow: themePresets.clean_white.button.shadow === 'hard' ? '2px 2px 0px rgba(0,0,0,1)' : 'none',
                                fontSize: '6px',
                                fontWeight: 'bold'
                            }}
                        >
                            <span style={{ fontFamily: fonts.body }}>Link {i}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Label */}
            <div className="p-2.5 bg-white flex items-center justify-between">
                <span className="text-[11px] font-bold text-zinc-900">{theme.name}</span>
                {theme.type === 'premium' && <Lock size={10} className="text-zinc-400" />}
            </div>

            {/* Active Checkmark */}
            {isActive && (
                <div className="absolute top-2 right-2 w-5 h-5 bg-primary-600 text-white rounded-full flex items-center justify-center shadow-lg border-2 border-white">
                    <Sparkles size={10} fill="currentColor" />
                </div>
            )}
        </button>
    );
};

const DesignPanel = ({ currentThemeId, customConfig, onChange, onSave, isDirty, isSaving }) => {
    const [openSection, setOpenSection] = useState('theme');

    const handleToggle = (section) => {
        setOpenSection(openSection === section ? null : section);
    };

    const handleThemeSelect = (themeId) => {
        onChange(themeId, null); // Clear overrides when picking a new theme
    };

    const updateConfig = (section, updates) => {
        const base = customConfig || themePresets[currentThemeId];
        const newConfig = {
            ...base,
            [section]: {
                ...(base[section] || {}),
                ...updates
            }
        };
        onChange(currentThemeId, newConfig);
    };

    return (
        <div className="bg-white rounded-[2rem] border border-zinc-100 shadow-xl overflow-hidden flex flex-col relative max-h-[70vh]">
            {/* Sticky Header */}
            <div className="sticky top-0 z-20 bg-white/80 backdrop-blur-md px-6 py-4 flex items-center justify-between border-b border-zinc-100">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-primary-50 flex items-center justify-center text-primary-600">
                        <Palette size={18} />
                    </div>
                    <h2 className="font-bold text-zinc-900">Design</h2>
                </div>

                {isDirty && (
                    <button
                        onClick={onSave}
                        disabled={isSaving}
                        className="bg-primary-600 text-white px-4 py-2 rounded-xl font-bold text-xs shadow-lg shadow-primary-500/20 hover:bg-primary-700 transition-all flex items-center justify-center gap-2 min-w-[120px]"
                    >
                        {isSaving ? (
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                            <>
                                <Sparkles size={14} fill="white" />
                                Save
                            </>
                        )}
                    </button>
                )}
            </div>

            <div className="flex-1 overflow-y-auto no-scrollbar">
                <DesignSection
                    id="theme"
                    title="Themes"
                    icon={Palette}
                    isOpen={openSection === 'theme'}
                    onToggle={handleToggle}
                >
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                        {Object.values(themePresets).map((theme) => (
                            <ThemeCard
                                key={theme.id}
                                theme={theme}
                                isActive={currentThemeId === theme.id && !customConfig}
                                onSelect={handleThemeSelect}
                            />
                        ))}
                    </div>
                </DesignSection>

                <DesignSection
                    id="background"
                    title="Background"
                    icon={ImageIcon}
                    isOpen={openSection === 'background'}
                    onToggle={handleToggle}
                >
                    <div className="space-y-6">
                        <div className="flex flex-col gap-2">
                            <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Type</label>
                            <div className="grid grid-cols-3 gap-2">
                                {['solid', 'gradient', 'image'].map((type) => (
                                    <button
                                        key={type}
                                        onClick={() => updateConfig('background', { type })}
                                        className={`
                                        py-2.5 rounded-xl border-2 text-[10px] font-bold capitalize transition-all
                                        ${(customConfig?.background?.type || themePresets[currentThemeId].background.type) === type
                                                ? 'border-primary-600 bg-primary-50 text-primary-600'
                                                : 'border-zinc-100 text-zinc-400 hover:border-zinc-200'}
                                    `}
                                    >
                                        {type}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {(customConfig?.background?.type || themePresets[currentThemeId].background.type) === 'solid' && (
                            <div className="flex flex-col gap-2">
                                <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Color</label>
                                <input
                                    type="color"
                                    value={customConfig?.background?.color || themePresets[currentThemeId].background.color}
                                    onChange={(e) => updateConfig('background', { color: e.target.value })}
                                    className="w-full h-12 rounded-xl border-2 border-zinc-100 p-1 cursor-pointer"
                                />
                            </div>
                        )}

                        {(customConfig?.background?.type || themePresets[currentThemeId].background.type) === 'gradient' && (
                            <div className="flex flex-col gap-2">
                                <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Presets</label>
                                <div className="grid grid-cols-4 gap-2">
                                    {[
                                        'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                        'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                                        'linear-gradient(135deg, #5ee7df 0%, #b490ca 100%)',
                                        'linear-gradient(135deg, #c3cfe2 0%, #c3cfe2 100%)'
                                    ].map((grad) => (
                                        <button
                                            key={grad}
                                            onClick={() => updateConfig('background', { value: grad })}
                                            className="aspect-square rounded-lg border-2 border-zinc-100 hover:border-primary-500 transition-all"
                                            style={{ backgroundImage: grad }}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}

                        {(customConfig?.background?.type || themePresets[currentThemeId].background.type) === 'image' && (
                            <div className="flex flex-col gap-2">
                                <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Image URL</label>
                                <input
                                    type="text"
                                    placeholder="Paste image URL..."
                                    value={customConfig?.background?.value || ''}
                                    onChange={(e) => updateConfig('background', { value: `url(${e.target.value})` })}
                                    className="w-full px-4 h-12 rounded-xl border-2 border-zinc-100 text-sm font-medium outline-none focus:ring-2 focus:ring-primary-500/20"
                                />
                            </div>
                        )}
                    </div>
                </DesignSection>

                <DesignSection
                    id="buttons"
                    title="Buttons"
                    icon={MousePointer2}
                    isOpen={openSection === 'buttons'}
                    onToggle={handleToggle}
                >
                    <div className="space-y-6">
                        <div className="flex flex-col gap-2">
                            <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Style</label>
                            <div className="grid grid-cols-3 gap-2">
                                {['solid', 'glass', 'outline'].map((style) => (
                                    <button
                                        key={style}
                                        onClick={() => updateConfig('button', { style })}
                                        className={`
                                        py-2.5 rounded-xl border-2 text-[10px] font-bold capitalize transition-all
                                        ${(customConfig?.button?.style || themePresets[currentThemeId].button.style) === style
                                                ? 'border-primary-600 bg-primary-50 text-primary-600'
                                                : 'border-zinc-100 text-zinc-400 hover:border-zinc-200'}
                                    `}
                                    >
                                        {style}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Border Radius</label>
                            <div className="flex items-center gap-4">
                                <input
                                    type="range"
                                    min="0"
                                    max="32"
                                    value={parseInt(customConfig?.button?.borderRadius || themePresets[currentThemeId].button.borderRadius)}
                                    onChange={(e) => updateConfig('button', { borderRadius: `${e.target.value}px` })}
                                    className="flex-1 h-1.5 bg-zinc-100 rounded-lg appearance-none cursor-pointer accent-primary-600"
                                />
                                <span className="text-[10px] font-bold text-zinc-900 w-8 tabular-nums">
                                    {parseInt(customConfig?.button?.borderRadius || themePresets[currentThemeId].button.borderRadius)}px
                                </span>
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Shadow</label>
                            <div className="grid grid-cols-2 gap-2">
                                {Object.keys(shadowPresets).map((s) => (
                                    <button
                                        key={s}
                                        onClick={() => updateConfig('button', { shadow: s })}
                                        className={`
                                        py-2.5 rounded-xl border-2 text-[10px] font-bold capitalize transition-all
                                        ${(customConfig?.button?.shadow || themePresets[currentThemeId].button.shadow) === s
                                                ? 'border-primary-600 bg-primary-50 text-primary-600'
                                                : 'border-zinc-100 text-zinc-400 hover:border-zinc-200'}
                                    `}
                                    >
                                        {s}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex flex-col gap-2">
                                <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Background</label>
                                <input
                                    type="color"
                                    value={customConfig?.button?.backgroundColor || themePresets[currentThemeId].button.backgroundColor}
                                    onChange={(e) => updateConfig('button', { backgroundColor: e.target.value })}
                                    className="w-full h-12 rounded-xl border-2 border-zinc-100 p-1 cursor-pointer"
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Text</label>
                                <input
                                    type="color"
                                    value={customConfig?.button?.textColor || themePresets[currentThemeId].button.textColor}
                                    onChange={(e) => updateConfig('button', { textColor: e.target.value })}
                                    className="w-full h-12 rounded-xl border-2 border-zinc-100 p-1 cursor-pointer"
                                />
                            </div>
                        </div>
                    </div>
                </DesignSection>

                <DesignSection
                    id="appearance"
                    title="Appearance"
                    icon={Sparkles}
                    isOpen={openSection === 'appearance'}
                    onToggle={handleToggle}
                >
                    <div className="space-y-6">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex flex-col gap-2">
                                <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Title Color</label>
                                <input
                                    type="color"
                                    value={customConfig?.titleColor || themePresets[currentThemeId].titleColor || '#000000'}
                                    onChange={(e) => onChange(currentThemeId, { ...(customConfig || themePresets[currentThemeId]), titleColor: e.target.value })}
                                    className="w-full h-12 rounded-xl border-2 border-zinc-100 p-1 cursor-pointer"
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Text Color</label>
                                <input
                                    type="color"
                                    value={customConfig?.textColor || themePresets[currentThemeId].textColor || '#000000'}
                                    onChange={(e) => onChange(currentThemeId, { ...(customConfig || themePresets[currentThemeId]), textColor: e.target.value })}
                                    className="w-full h-12 rounded-xl border-2 border-zinc-100 p-1 cursor-pointer"
                                />
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Accent Color</label>
                            <input
                                type="color"
                                value={customConfig?.accentColor || themePresets[currentThemeId].accentColor || '#3b82f6'}
                                onChange={(e) => onChange(currentThemeId, { ...(customConfig || themePresets[currentThemeId]), accentColor: e.target.value })}
                                className="w-full h-12 rounded-xl border-2 border-zinc-100 p-1 cursor-pointer"
                            />
                        </div>
                    </div>
                </DesignSection>

                <DesignSection
                    id="text"
                    title="Fonts"
                    icon={Type}
                    isOpen={openSection === 'text'}
                    onToggle={handleToggle}
                >
                    <div className="space-y-6">
                        <div className="flex flex-col gap-2">
                            <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Font Family</label>
                            <div className="grid grid-cols-1 gap-2">
                                {fontOptions.map((font) => (
                                    <button
                                        key={font.value}
                                        onClick={() => updateConfig('fonts', { title: font.value, body: font.value })}
                                        className={`
                                        p-4 rounded-xl border-2 flex items-center justify-between transition-all
                                        ${(customConfig?.fonts?.title || themePresets[currentThemeId].fonts.title) === font.value
                                                ? 'border-primary-600 bg-primary-50 text-primary-600'
                                                : 'border-zinc-100 text-zinc-500 hover:border-zinc-200'}
                                    `}
                                        style={{ fontFamily: font.value }}
                                    >
                                        <span className="text-sm">{font.name}</span>
                                        <span className="text-xs opacity-50">Aa</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </DesignSection>
            </div>
        </div>
    );
};

export default DesignPanel;
