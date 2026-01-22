import React, { useState } from 'react';
import { Cookie, ArrowLeft, ShieldCheck, BarChart3, Target } from 'lucide-react';
import { Link } from 'react-router-dom';

const CookiePreferences = () => {
    const [preferences, setPreferences] = useState({
        essential: true, // Always true
        analytics: true,
        marketing: false
    });

    const [saved, setSaved] = useState(false);

    const togglePreference = (key) => {
        if (key === 'essential') return;
        setPreferences(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const handleSave = () => {
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
        // In a real app, save to localStorage/backend
        localStorage.setItem('cookie_preferences', JSON.stringify(preferences));
    };

    return (
        <div className="min-h-screen bg-white font-sans text-zinc-900">
            {/* Header */}
            <div className="border-b border-zinc-100 sticky top-0 bg-white/80 backdrop-blur-md z-10">
                <div className="max-w-4xl mx-auto px-6 h-20 flex items-center justify-between">
                    <Link to="/" className="flex items-center gap-2 text-zinc-600 hover:text-primary-600 transition-colors">
                        <ArrowLeft size={20} />
                        <span className="font-semibold text-sm">Back to Home</span>
                    </Link>
                    <div className="flex items-center gap-2 text-primary-600">
                        <Cookie size={24} fill="currentColor" />
                        <span className="font-black tracking-tight">RevLinko Privacy</span>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-3xl mx-auto px-6 py-16">
                <div className="text-center mb-16">
                    <div className="size-16 rounded-2xl bg-primary-100 text-primary-600 flex items-center justify-center mx-auto mb-6">
                        <Cookie size={32} />
                    </div>
                    <h1 className="text-4xl lg:text-5xl font-black mb-4 tracking-tight">Cookie Preferences</h1>
                    <p className="text-zinc-500 max-w-xl mx-auto font-medium">
                        We use cookies to enhance your browsing experience, serve personalized ads or content, and analyze our traffic.
                    </p>
                </div>

                <div className="space-y-6">
                    {/* Essential */}
                    <div className="p-8 rounded-[2rem] border border-zinc-100 bg-zinc-50 flex items-start justify-between gap-6 transition-all hover:border-zinc-200">
                        <div className="flex gap-4">
                            <div className="size-12 rounded-xl bg-white border border-zinc-100 flex items-center justify-center text-zinc-400 shrink-0">
                                <ShieldCheck size={24} />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg mb-1">Essential Cookies</h3>
                                <p className="text-zinc-500 text-sm leading-relaxed">
                                    Necessary for the website to function and cannot be switched off. They are usually set in response to actions made by you which amount to a request for services.
                                </p>
                            </div>
                        </div>
                        <div className="h-6 w-11 bg-zinc-200 rounded-full cursor-not-allowed relative">
                            <div className="absolute right-1 top-1 size-4 bg-white rounded-full shadow-sm"></div>
                        </div>
                    </div>

                    {/* Analytics */}
                    <div
                        onClick={() => togglePreference('analytics')}
                        className="p-8 rounded-[2rem] border border-zinc-100 bg-white flex items-start justify-between gap-6 cursor-pointer transition-all hover:border-primary-600/20 hover:bg-primary-50/10"
                    >
                        <div className="flex gap-4">
                            <div className={`size-12 rounded-xl flex items-center justify-center shrink-0 transition-colors ${preferences.analytics ? 'bg-primary-100 text-primary-600' : 'bg-zinc-100 text-zinc-400'}`}>
                                <BarChart3 size={24} />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg mb-1">Analytical Cookies</h3>
                                <p className="text-zinc-500 text-sm leading-relaxed">
                                    Help us understand how visitors interact with the website by collecting and reporting information anonymously. This helps us improve our platform.
                                </p>
                            </div>
                        </div>
                        <div className={`h-6 w-11 rounded-full relative transition-colors ${preferences.analytics ? 'bg-primary-600' : 'bg-zinc-200'}`}>
                            <div className={`absolute top-1 size-4 bg-white rounded-full shadow-sm transition-all ${preferences.analytics ? 'right-1' : 'left-1'}`}></div>
                        </div>
                    </div>

                    {/* Marketing */}
                    <div
                        onClick={() => togglePreference('marketing')}
                        className="p-8 rounded-[2rem] border border-zinc-100 bg-white flex items-start justify-between gap-6 cursor-pointer transition-all hover:border-primary-600/20 hover:bg-primary-50/10"
                    >
                        <div className="flex gap-4">
                            <div className={`size-12 rounded-xl flex items-center justify-center shrink-0 transition-colors ${preferences.marketing ? 'bg-primary-100 text-primary-600' : 'bg-zinc-100 text-zinc-400'}`}>
                                <Target size={24} />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg mb-1">Marketing Cookies</h3>
                                <p className="text-zinc-500 text-sm leading-relaxed">
                                    Used to track visitors across websites. The intention is to display ads that are relevant and engaging for the individual user.
                                </p>
                            </div>
                        </div>
                        <div className={`h-6 w-11 rounded-full relative transition-colors ${preferences.marketing ? 'bg-primary-600' : 'bg-zinc-200'}`}>
                            <div className={`absolute top-1 size-4 bg-white rounded-full shadow-sm transition-all ${preferences.marketing ? 'right-1' : 'left-1'}`}></div>
                        </div>
                    </div>
                </div>

                <div className="mt-12 flex items-center justify-between gap-4 p-8 bg-zinc-900 rounded-[2.5rem] text-white">
                    <div>
                        <p className="font-bold">Ready to save?</p>
                        <p className="text-zinc-400 text-sm">Your preferences will be applied instantly.</p>
                    </div>
                    <button
                        onClick={handleSave}
                        className={`px-8 py-3 rounded-full font-bold transition-all ${saved ? 'bg-green-500' : 'bg-white text-zinc-900 hover:scale-105'}`}
                    >
                        {saved ? 'Preferences Saved!' : 'Save Preferences'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CookiePreferences;
