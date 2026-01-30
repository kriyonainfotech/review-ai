import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    Star,
    Copy,
    Check,
    ArrowRight,
    Loader2,
    Building2
} from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { api } from '../api';
import { ThemeProvider } from '../themes/ThemeProvider';

const AIReviewPageContent = ({ business, review, genLoading, handleGenerateReview, handleCopyAndVisit, copied, navigate }) => {
    return (
        <div
            className="min-h-screen flex flex-col items-center p-6 font-sans transition-all duration-500"
            style={{
                backgroundImage: 'var(--theme-bg-gradient)',
                backgroundSize: 'var(--theme-bg-size)',
                backgroundColor: 'var(--theme-bg)',
                fontFamily: 'var(--theme-font-body)'
            }}
        >
            <div className="w-full max-w-[500px] animate-fade-in-up flex flex-col min-h-[90vh]">

                {/* Branding Section */}
                <div className="text-center mb-8 sm:mb-10 pt-10">
                    <div className="relative inline-block mb-6">
                        <div className="relative w-24 h-24 bg-white/10 backdrop-blur-md rounded-full shadow-2xl flex items-center justify-center mx-auto border-[6px] border-white/20 overflow-hidden ring-1 ring-white/10">
                            {business?.logoUrl ? (
                                <img src={business.logoUrl} alt={business.businessName} className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center bg-zinc-50/10">
                                    <Building2 size={32} className="text-white/20" />
                                </div>
                            )}
                        </div>
                    </div>
                    <h1 className="text-2xl sm:text-3xl font-black tracking-tight mb-2" style={{ color: 'var(--theme-text-primary)', fontFamily: 'var(--theme-font-title)' }}>
                        Review {business?.businessName}
                    </h1>
                    <p className="opacity-70 font-medium text-sm sm:text-base" style={{ color: 'var(--theme-text-secondary)' }}>
                        We've drafted a perfect review for you.
                    </p>
                </div>

                {/* Review Card */}
                <div
                    className="p-6 sm:p-8 mb-8 shadow-2xl border border-white/10 rounded-[2.5rem] relative overflow-hidden flex-1 flex flex-col justify-center"
                    style={{
                        backgroundColor: 'var(--btn-bg)',
                        color: 'var(--btn-text)',
                        borderRadius: 'var(--btn-radius)',
                        boxShadow: 'var(--btn-shadow)',
                        backdropFilter: `blur(var(--p-btn-blur, 12px))`,
                    }}
                >
                    <div className="absolute top-0 right-0 w-32 h-32 blur-3xl rounded-full -mr-16 -mt-16 opacity-10 bg-primary-500" />

                    <div className="relative mb-6">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-primary-400 text-[10px] font-black uppercase tracking-widest mb-4 border border-white/5">
                            <img src="/Vector.svg" alt="AI" className="w-3 h-auto brightness-0 invert" />
                            AI Generated
                        </div>
                        <div className="flex gap-1 mb-6">
                            {[1, 2, 3, 4, 5].map(n => (
                                <Star key={n} size={18} className="fill-amber-400 text-amber-400" />
                            ))}
                        </div>

                        <div className="min-h-[120px] relative">
                            {genLoading ? (
                                <div className="absolute inset-0 flex items-center justify-center z-10">
                                    <Loader2 className="animate-spin text-primary-500" size={32} />
                                </div>
                            ) : null}
                            <p className={`text-lg sm:text-xl font-medium leading-relaxed italic ${genLoading ? 'blur-sm grayscale opacity-30 scale-95' : 'scale-100'} transition-all duration-500`}>
                                "{review}"
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center justify-between pt-6 border-t border-white/10 mt-6">
                        <button
                            onClick={() => handleGenerateReview(business.slug)}
                            disabled={genLoading}
                            className="font-black text-[11px] uppercase tracking-widest transition-all flex items-center gap-1.5 disabled:opacity-50 hover:opacity-80"
                            style={{ color: 'var(--accent-color)' }}
                        >
                            <img src="/Vector.svg" alt="AI" className="w-3.5 h-auto brightness-0 invert" />
                            Regenerate
                        </button>
                        <p className="text-[10px] font-bold opacity-40 uppercase tracking-widest flex items-center gap-2">
                            <Check size={12} className="text-emerald-500" />
                            Verified Quality
                        </p>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-4 pb-10">
                    <button
                        onClick={handleCopyAndVisit}
                        disabled={copied || !review}
                        className={`w-full h-16 rounded-[2rem] text-sm font-black uppercase tracking-widest flex items-center justify-center gap-3 transition-all duration-500 ${copied
                            ? 'bg-emerald-500 text-white shadow-emerald-500/20 shadow-xl scale-100'
                            : 'bg-white text-zinc-900 hover:scale-[1.02] active:scale-[0.98] shadow-2xl'
                            }`}
                        style={!copied ? {
                            backgroundColor: 'var(--accent-color)',
                            color: 'white', // Ensure high contrast for the primary CTA
                            borderRadius: 'var(--btn-radius)'
                        } : {}}
                    >
                        {copied ? (
                            <>
                                <Check size={20} strokeWidth={3} className="animate-in zoom-in" />
                                Copied! Redirecting...
                            </>
                        ) : (
                            <>
                                <Copy size={20} />
                                Copy & Visit Google Review
                                <ArrowRight size={20} className="ml-1 opacity-50" />
                            </>
                        )}
                    </button>

                    <button
                        onClick={() => navigate(-1)}
                        className="w-full py-4 font-bold text-xs uppercase tracking-[0.2em] opacity-40 hover:opacity-100 transition-all border-2 border-transparent hover:border-white/10 rounded-[2rem]"
                        style={{ color: 'var(--btn-text)' }}
                    >
                        Back to Bio
                    </button>
                </div>
            </div>
        </div>
    );
};

const AIReviewPage = () => {
    const { identifier } = useParams();
    const navigate = useNavigate();
    const [business, setBusiness] = useState(null);
    const [review, setReview] = useState('');
    const [loading, setLoading] = useState(true);
    const [genLoading, setGenLoading] = useState(false);
    const [copied, setCopied] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const init = async () => {
            try {
                const bizData = await api.getBusinessByIdentifier(identifier);
                setBusiness(bizData);
                handleGenerateReview(bizData.slug);
            } catch (err) {
                setError('Could not load business information.');
                setLoading(false);
            }
        };
        init();
    }, [identifier]);

    const handleGenerateReview = async (bizIdentifier) => {
        setGenLoading(true);
        setError('');
        try {
            const data = await api.generateAIReview(bizIdentifier || identifier);
            setReview(data.review);
        } catch (err) {
            setError('Failed to generate review. Please try again.');
        } finally {
            setGenLoading(false);
            setLoading(false);
        }
    };

    const handleCopyAndVisit = () => {
        navigator.clipboard.writeText(review);
        setCopied(true);
        setTimeout(() => {
            window.location.href = business.googleReviewLink;
        }, 1500);
    };

    if (loading) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-zinc-900 gap-4">
                <Loader2 size={48} className="animate-spin text-primary-500" />
                <p className="text-white/50 font-bold tracking-widest uppercase text-xs">Personalizing your review...</p>
            </div>
        );
    }

    if (error && !review) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-zinc-900 text-center">
                <h1 className="text-2xl font-black text-white mb-4">Oops!</h1>
                <p className="text-white/50 mb-8">{error}</p>
                <Button onClick={() => window.location.reload()} variant="primary">Try Again</Button>
            </div>
        );
    }

    const themeId = business.themeId || 'clean_white';
    const customOverrides = business.customConfig ? JSON.parse(business.customConfig) : null;

    return (
        <ThemeProvider initialThemeId={themeId} customOverrides={customOverrides}>
            <AIReviewPageContent
                business={business}
                review={review}
                genLoading={genLoading}
                handleGenerateReview={handleGenerateReview}
                handleCopyAndVisit={handleCopyAndVisit}
                copied={copied}
                navigate={navigate}
            />
        </ThemeProvider>
    );
};

export default AIReviewPage;
