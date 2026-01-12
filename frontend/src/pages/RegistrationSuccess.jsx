import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Check, Globe, Share2, LayoutDashboard, Sparkles } from 'lucide-react';
import Button from '../components/ui/Button';

const RegistrationSuccess = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [successMessage, setSuccessMessage] = useState('');

    // Get username from location state or fallback
    const username = location.state?.username || JSON.parse(localStorage.getItem('user'))?.slug || 'username';

    const handleCopyLink = () => {
        navigator.clipboard.writeText(`revlinko.com/${username}`);
        setSuccessMessage('Link copied!');
        setTimeout(() => setSuccessMessage(''), 2000);
    };

    return (
        <div className="flex min-h-screen w-full flex-col items-center justify-center p-4 bg-slate-50 font-sans relative overflow-hidden">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
                <svg height="100%" width="100%">
                    <defs>
                        <pattern height="40" id="success-grid" patternUnits="userSpaceOnUse" width="40">
                            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#2463eb" strokeWidth="1"></path>
                        </pattern>
                    </defs>
                    <rect fill="url(#success-grid)" height="100%" width="100%"></rect>
                </svg>
            </div>

            <div className="w-full max-w-[480px] bg-white rounded-[32px] p-8 lg:p-10 shadow-2xl border border-slate-100 relative z-10 animate-in fade-in zoom-in duration-700">
                <div className="text-center space-y-8">
                    {/* Success Icon */}
                    <div className="relative mx-auto">
                        <div className="size-20 bg-emerald-100 text-emerald-600 rounded-3xl flex items-center justify-center mx-auto rotate-12 animate-in zoom-in duration-500 delay-200">
                            <Check size={40} strokeWidth={3} className="-rotate-12" />
                        </div>
                        <div className="absolute -top-2 -right-2 size-8 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center animate-bounce">
                            <Sparkles size={16} fill="currentColor" />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <h2 className="text-3xl font-black text-slate-900 tracking-tight">You're All Set!</h2>
                        <p className="text-slate-500 font-medium">Your account and business profile are ready.</p>
                    </div>

                    {/* Link Card */}
                    <div className="space-y-3">
                        <div className="p-5 bg-slate-50 border border-slate-200 rounded-[24px] flex items-center justify-between gap-3 group transition-all hover:border-primary-300 hover:shadow-md">
                            <div className="flex items-center gap-4 text-left min-w-0">
                                <div className="size-12 shrink-0 rounded-2xl bg-white border border-slate-100 flex items-center justify-center text-primary-600 shadow-sm">
                                    <Globe size={24} />
                                </div>
                                <div className="min-w-0">
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Your Public Link</p>
                                    <p className="text-base font-bold text-slate-900 tracking-tight break-all">revlinko.com/{username}</p>
                                </div>
                            </div>
                            <button
                                onClick={handleCopyLink}
                                className="size-11 shrink-0 flex items-center justify-center rounded-2xl bg-white border border-slate-200 text-slate-600 hover:text-primary-600 hover:border-primary-600 hover:shadow-lg transition-all active:scale-90"
                            >
                                <Share2 size={20} />
                            </button>
                        </div>

                        {successMessage && (
                            <div className="flex justify-center items-center gap-1.5 text-emerald-600 animate-in fade-in slide-in-from-top-1">
                                <Check size={14} strokeWidth={3} />
                                <span className="text-xs font-bold uppercase tracking-wider">{successMessage}</span>
                            </div>
                        )}
                    </div>

                    {/* Actions */}
                    <div className="grid grid-cols-1 gap-3.5 pt-2">
                        <Button
                            onClick={() => navigate('/dashboard')}
                            fullWidth
                            size="lg"
                            className="h-14 text-base shadow-xl shadow-primary-600/20"
                        >
                            <LayoutDashboard size={20} className="mr-2" />
                            Go to Dashboard
                        </Button>
                        <Button
                            variant="secondary"
                            onClick={() => window.open(`/${username}`, '_blank')}
                            fullWidth
                            size="lg"
                            className="h-14 text-base border-slate-200"
                        >
                            <Globe size={20} className="mr-2" />
                            View Live Page
                        </Button>
                    </div>

                    {/* <div className="pt-4">
                        <p className="text-slate-400 text-xs font-medium">Need help? <button className="text-primary-600 font-bold hover:underline">Contact Support</button></p>
                    </div> */}
                </div>
            </div>
        </div>
    );
};

export default RegistrationSuccess;
