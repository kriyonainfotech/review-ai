import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Twitter, Github } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-white border-t border-zinc-100 py-16">
            <div className="container-tight flex flex-col items-center gap-8">
                {/* Brand Icon */}
                <div className="flex items-center gap-2 grayscale opacity-50">
                    <div className="w-8 h-8 bg-zinc-900 rounded-lg flex items-center justify-center text-white">
                        <Sparkles size={18} fill="currentColor" />
                    </div>
                </div>

                {/* Minimal Socials */}
                <div className="flex items-center gap-8">
                    <a href="#" className="text-zinc-400 hover:text-primary-600 transition-colors flex items-center gap-2 text-sm font-medium">
                        <Twitter size={16} />
                        Twitter
                    </a>
                    <a href="#" className="text-zinc-400 hover:text-zinc-900 transition-colors flex items-center gap-2 text-sm font-medium">
                        <Github size={16} />
                        GitHub
                    </a>
                </div>

                {/* Copyright */}
                <p className="text-sm text-zinc-400 font-medium">
                    © {new Date().getFullYear()} ReviewLink AI. All rights reserved.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
