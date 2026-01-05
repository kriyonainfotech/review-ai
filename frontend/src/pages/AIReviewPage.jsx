import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    Star,
    Copy,
    Check,
    Sparkles,
    ArrowRight,
    Loader2,
    Building2
} from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { api } from '../api';

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
                // Fetch business info first
                const bizData = await api.getBusinessByIdentifier(identifier);
                setBusiness(bizData);

                // Then generate initial review
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

        // Show success and then redirect
        setTimeout(() => {
            window.location.href = business.googleReviewLink;
        }, 1500);
    };

    if (loading) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-zinc-50 gap-4">
                <div className="relative">
                    <div className="absolute inset-0 bg-primary-500/20 blur-2xl rounded-full scale-150 animate-pulse" />
                    <Loader2 size={48} className="animate-spin text-primary-600 relative z-10" />
                </div>
                <p className="text-zinc-500 font-bold tracking-widest uppercase text-xs animate-pulse">Personalizing your review...</p>
            </div>
        );
    }

    if (error && !review) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-zinc-50 text-center">
                <div className="w-20 h-20 bg-red-50 text-red-500 rounded-3xl flex items-center justify-center mb-8">
                    <Building2 size={40} />
                </div>
                <h1 className="text-2xl font-black text-zinc-900 mb-4 tracking-tight">Oops! Something went wrong</h1>
                <p className="text-zinc-500 mb-8 max-w-sm mx-auto">{error}</p>
                <Button onClick={() => window.location.reload()} variant="secondary">Try Again</Button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-zinc-50 flex flex-col items-center justify-center p-6 font-sans">
            <div className="w-full max-w-[500px] animate-fade-in-up">

                {/* Branding Section */}
                <div className="text-center mb-10">
                    <div className="w-20 h-20 bg-white rounded-3xl shadow-xl flex items-center justify-center mx-auto mb-6 border-4 border-white group overflow-hidden">
                        {business?.logoUrl ? (
                            <img src={business.logoUrl} alt={business.businessName} className="w-full h-full object-cover" />
                        ) : (
                            <Building2 size={32} className="text-zinc-300" />
                        )}
                    </div>
                    <h1 className="text-2xl font-black text-zinc-900 tracking-tight mb-2">Review {business?.businessName}</h1>
                    <p className="text-zinc-500 font-medium text-sm">We've drafted a perfect review for you.</p>
                </div>

                {/* Review Card */}
                <Card className="p-8 mb-8 shadow-2xl border-zinc-100 rounded-[2.5rem] relative overflow-hidden bg-white">
                    <div className="absolute top-0 right-0 w-32 h-32 blur-3xl rounded-full -mr-16 -mt-16 opacity-10 bg-primary-500" />

                    <div className="relative mb-6">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-50 text-primary-600 text-[10px] font-black uppercase tracking-widest mb-4">
                            <Sparkles size={12} strokeWidth={3} />
                            AI Generated
                        </div>
                        <div className="flex gap-1 mb-6">
                            {[1, 2, 3, 4, 5].map(n => (
                                <Star key={n} size={18} className="fill-amber-400 text-amber-400" />
                            ))}
                        </div>

                        <div className="min-h-[120px] relative">
                            {genLoading ? (
                                <div className="absolute inset-0 flex items-center justify-center bg-white/50 backdrop-blur-sm z-10 transition-all duration-300">
                                    <Loader2 className="animate-spin text-primary-600" size={24} />
                                </div>
                            ) : null}
                            <p className={`text-zinc-700 text-lg font-medium leading-relaxed italic ${genLoading ? 'blur-sm grayscale opacity-30 scale-95' : 'scale-100'} transition-all duration-500`}>
                                "{review}"
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center justify-between pt-6 border-t border-zinc-50 mt-6">
                        <button
                            onClick={() => handleGenerateReview(business.slug)}
                            disabled={genLoading}
                            className="text-primary-600 font-black text-[11px] uppercase tracking-widest hover:text-primary-700 transition-colors flex items-center gap-1.5 disabled:opacity-50"
                        >
                            <Sparkles size={14} />
                            Regenerate
                        </button>
                        <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest flex items-center gap-2">
                            <Check size={12} className="text-emerald-500" />
                            Verified Quality
                        </p>
                    </div>
                </Card>

                {/* Action Button */}
                <div className="space-y-4">
                    <button
                        onClick={handleCopyAndVisit}
                        disabled={copied || !review}
                        className={`w-full h-16 rounded-[2rem] text-sm font-black uppercase tracking-widest flex items-center justify-center gap-3 transition-all duration-500 ${copied
                            ? 'bg-emerald-500 text-white shadow-emerald-500/20 shadow-xl scale-100'
                            : 'bg-zinc-900 text-white hover:bg-black hover:scale-[1.02] active:scale-[0.98] shadow-2xl shadow-zinc-900/20'
                            }`}
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
                        className="w-full py-4 text-zinc-400 font-bold text-xs uppercase tracking-[0.2em] hover:text-zinc-600 transition-colors"
                    >
                        Back to Bio
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AIReviewPage;
