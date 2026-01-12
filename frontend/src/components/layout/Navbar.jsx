import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../ui/Button';
import { Sparkles } from 'lucide-react';

const Navbar = () => {
    return (
        <header className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-[#f0f1f4]">
            <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                {/* Logo */}
                <Link to="/" className="flex items-center gap-2 transition-opacity hover:opacity-90">
                    <div className="text-primary-600">
                        <Sparkles size={32} fill="currentColor" />
                    </div>
                    <h2 className="text-xl font-black tracking-tight font-sans">RevLinko</h2>
                </Link>

                {/* Navigation Links */}
                <nav className="hidden md:flex items-center gap-10">
                    <a className="text-sm font-semibold hover:text-primary-600 transition-colors" href="#features">Features</a>
                    <a className="text-sm font-semibold hover:text-primary-600 transition-colors" href="#use-cases">Use Cases</a>
                    <a className="text-sm font-semibold hover:text-primary-600 transition-colors" href="#pricing">Pricing</a>
                </nav>

                {/* Actions */}
                <div className="flex items-center gap-4">
                    <Link to="/login" className="hidden sm:block">
                        <Button variant="ghost" size="sm" className="text-zinc-600 font-semibold">Log in</Button>
                    </Link>
                    <Link to="/register">
                        <button className="bg-primary-600 text-white text-sm font-bold px-6 py-2.5 rounded-full hover:bg-primary-700 transition-all shadow-lg shadow-primary-500/20">
                            Get Started
                        </button>
                    </Link>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
