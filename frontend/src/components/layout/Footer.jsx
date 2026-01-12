import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Twitter, Github } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-white border-t border-slate-100 pt-20 pb-10">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 mb-16">
                    <div className="col-span-2 lg:col-span-2">
                        <div className="flex items-center gap-2 mb-6 text-primary-600">
                            <Sparkles size={24} fill="currentColor" />
                            <h2 className="text-xl font-black tracking-tight font-sans text-zinc-900">RevLinko</h2>
                        </div>
                        <p className="text-slate-500 text-sm max-w-xs leading-relaxed font-sans">
                            The world's most advanced AI-powered reputation management platform for local businesses and agencies.
                        </p>
                    </div>
                    <div>
                        <h4 className="font-bold mb-6 text-sm uppercase tracking-widest text-zinc-900">Platform</h4>
                        <ul className="space-y-4 text-slate-500 text-sm font-sans">
                            <li><a className="hover:text-primary-600 transition-colors" href="#">Features</a></li>
                            <li><a className="hover:text-primary-600 transition-colors" href="#">Integrations</a></li>
                            <li><a className="hover:text-primary-600 transition-colors" href="#">Pricing</a></li>
                            <li><a className="hover:text-primary-600 transition-colors" href="#">API</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold mb-6 text-sm uppercase tracking-widest text-zinc-900">Company</h4>
                        <ul className="space-y-4 text-slate-500 text-sm font-sans">
                            <li><a className="hover:text-primary-600 transition-colors" href="#">About Us</a></li>
                            <li><a className="hover:text-primary-600 transition-colors" href="#">Blog</a></li>
                            <li><a className="hover:text-primary-600 transition-colors" href="#">Careers</a></li>
                            <li><a className="hover:text-primary-600 transition-colors" href="#">Contact</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold mb-6 text-sm uppercase tracking-widest text-zinc-900">Legal</h4>
                        <ul className="space-y-4 text-slate-500 text-sm font-sans">
                            <li><a className="hover:text-primary-600 transition-colors" href="#">Privacy Policy</a></li>
                            <li><a className="hover:text-primary-600 transition-colors" href="#">Terms of Service</a></li>
                            <li><a className="hover:text-primary-600 transition-colors" href="#">Cookies</a></li>
                        </ul>
                    </div>
                </div>
                <div className="pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-400 text-xs font-sans">
                    <p>© {new Date().getFullYear()} RevLinko Inc. All rights reserved.</p>
                    <div className="flex items-center gap-6">
                        <a className="hover:text-primary-600 transition-colors" href="#">Twitter</a>
                        <a className="hover:text-primary-600 transition-colors" href="#">LinkedIn</a>
                        <a className="hover:text-primary-600 transition-colors" href="#">Instagram</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
