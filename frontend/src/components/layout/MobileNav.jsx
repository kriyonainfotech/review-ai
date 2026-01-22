import React from 'react';
import { Link2, Palette, Eye, LayoutDashboard, UserCircle } from 'lucide-react';

const MobileNav = ({ activeTab, onTabChange, onShowPreview }) => {
    const tabs = [
        { id: 'links', label: 'Links', icon: Link2 },
        { id: 'design', label: 'Design', icon: Palette },
        { id: 'profile', label: 'Profile', icon: UserCircle },
        // { id: 'stats', label: 'Stats', icon: LayoutDashboard, disabled: true },
    ];

    return (
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-xl border-t border-zinc-100 px-6 py-3 z-50 safe-bottom">
            <div className="flex items-center justify-between max-w-md mx-auto">
                {tabs.map((tab) => {
                    const Icon = tab.icon;
                    const isActive = activeTab === tab.id;

                    return (
                        <button
                            key={tab.id}
                            onClick={() => !tab.disabled && onTabChange(tab.id)}
                            className={`flex flex-col items-center gap-1 transition-all ${tab.disabled ? 'opacity-30 cursor-not-allowed' : ''} ${isActive ? 'text-primary-600' : 'text-zinc-400'}`}
                        >
                            <div className={`p-1 rounded-lg transition-colors ${isActive ? 'bg-primary-50' : ''}`}>
                                <Icon size={20} />
                            </div>
                            <span className="text-[10px] font-bold uppercase tracking-tight">{tab.label}</span>
                        </button>
                    );
                })}

                {/* Special Preview Button for Mobile */}
                <button
                    onClick={onShowPreview}
                    className="flex flex-col items-center gap-1 text-zinc-400"
                >
                    <div className="p-1 rounded-lg">
                        <Eye size={20} />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-tight">Preview</span>
                </button>
            </div>
        </div>
    );
};

export default MobileNav;
