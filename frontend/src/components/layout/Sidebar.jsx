import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import {
    LayoutDashboard,
    Building2,
    Link2,
    BarChart3,
    Settings,
    Sparkles,
    UserCircle,
    X
} from 'lucide-react';

const Sidebar = ({ isOpen, onClose }) => {
    const menuItems = [
        { label: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
        { label: 'Business Profile', icon: Building2, path: '/create-business' },
        { label: 'Review Links', icon: Link2, path: '/link-selection' },
        // { label: 'Analytics', icon: BarChart3, path: '/analytics' },
        // { label: 'Settings', icon: Settings, path: '/settings' }
    ];

    return (
        <aside className={`
            w-64 h-screen border-r border-zinc-100 fixed left-0 top-0 bg-white p-6 flex flex-col z-50 transition-transform duration-300 lg:translate-x-0
            ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}>
            {/* Logo Area & Close Button */}
            <div className="mb-10 px-2 flex items-center justify-between">
                <Link to="/" onClick={onClose} className="flex items-center gap-2.5 group">
                    <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center text-white group-hover:bg-primary-700 transition-colors">
                        <Sparkles size={18} fill="currentColor" />
                    </div>
                    <span className="text-lg font-bold tracking-tight text-zinc-900 leading-none">ReviewLink</span>
                </Link>
                <button
                    onClick={onClose}
                    className="lg:hidden p-2 -mr-2 text-zinc-400 hover:text-zinc-600 transition-colors"
                >
                    <X size={20} />
                </button>
            </div>

            {/* Navigation */}
            <nav className="flex flex-col gap-1.5 flex-1">
                {menuItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        onClick={onClose}
                        className={({ isActive }) => `
                            flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200
                            ${isActive
                                ? 'bg-primary-50 text-primary-600 shadow-sm border-primary-100'
                                : 'text-zinc-500 hover:bg-zinc-50 hover:text-zinc-900'}
                        `}
                    >
                        <item.icon size={20} />
                        {item.label}
                    </NavLink>
                ))}
            </nav>

            {/* User Profile Snippet */}
            {/* <div className="mt-auto p-4 bg-zinc-50 rounded-2xl border border-zinc-100 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary-600 flex items-center justify-center text-white shadow-sm ring-2 ring-white">
                    <UserCircle size={24} />
                </div>
                <div className="overflow-hidden">
                    <p className="text-sm font-semibold text-zinc-900 truncate">Alex Morgan</p>
                    <p className="text-xs text-zinc-500 truncate">alex@demo.com</p>
                </div>
            </div> */}
        </aside>
    );
};

export default Sidebar;
