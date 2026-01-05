import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../ui/Button';
import { Sparkles } from 'lucide-react';

const Navbar = () => {
    return (
        <nav className="h-20 glass fixed top-0 left-0 right-0 z-50 flex items-center border-b border-zinc-100">
            <div className="container-tight flex items-center justify-between">
                {/* Logo */}
                <Link to="/" className="flex items-center gap-2.5 transition-opacity hover:opacity-90">
                    <div className="w-9 h-9 bg-primary-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary-500/20">
                        <Sparkles size={20} fill="currentColor" />
                    </div>
                    <span className="text-lg font-bold tracking-tight text-zinc-900">
                        ReviewLink
                    </span>
                </Link>

                {/* Actions */}
                <div className="flex items-center gap-3">
                    <Link to="/login" className="hidden sm:block">
                        <Button variant="ghost" size="sm" className="text-zinc-600">Log in</Button>
                    </Link>
                    <Link to="/register">
                        <Button size="sm">Get Started</Button>
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
