import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import {
    Sparkles,
    Star,
    Copy,
    ExternalLink,
    CheckCircle2,
    Lightbulb,
    Info,
    Instagram,
    Facebook,
    Globe,
    MapPin,
    ArrowRight,
    Loader2
} from 'lucide-react';
import { api } from '../api';

const PublicReviewPage = () => {
    const { id: slug } = useParams();
    const [business, setBusiness] = useState(null);
    const [review, setReview] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [showToast, setShowToast] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await api.getBusinessBySlug(slug);
                setBusiness(data);

                // Real AI generation
                const aiData = await api.generateAIReview(slug);
                setReview(aiData.review);
                setIsLoading(false);
            } catch (err) {
                setError('Business not found or generation failed');
                setIsLoading(false);
            }
        };

        if (slug) fetchData();
    }, [slug]);

    const copyReview = () => {
        if (!review) return;
        navigator.clipboard.writeText(review);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
    };

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center p-6 bg-zinc-50">
                <Card className="max-w-md w-full p-12 text-center shadow-2xl border-zinc-100 animate-fade-in-up">
                    <div className="relative w-24 h-24 mx-auto mb-10">
                        <div className="absolute inset-0 bg-primary-100 rounded-[2rem] animate-pulse"></div>
                        <div className="relative z-10 w-full h-full bg-white rounded-[1.75rem] border-4 border-primary-50 flex items-center justify-center text-primary-600 shadow-xl" style={{ color: business?.primaryColor || '#3b82f6' }}>
                            <Sparkles size={40} className="animate-bounce" />
                        </div>
                        <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-primary-600 text-white rounded-full flex items-center justify-center border-4 border-white shadow-lg" style={{ backgroundColor: business?.primaryColor || '#3b82f6' }}>
                            <Loader2 size={18} className="animate-spin" />
                        </div>
                    </div>

                    <h2 className="text-2xl font-black text-zinc-900 tracking-tight mb-4">Generating Review...</h2>
                    <p className="text-zinc-500 font-medium mb-10 leading-relaxed px-2">
                        Our AI is analyzing your experience at <span className="font-bold" style={{ color: business?.primaryColor || '#3b82f6' }}>{business?.businessName || 'the business'}</span> to draft the perfect feedback.
                    </p>

                    <div className="border p-6 rounded-3xl text-left flex gap-4 mb-8 group" style={{ backgroundColor: `${business?.primaryColor || '#3b82f6'}10`, borderColor: `${business?.primaryColor || '#3b82f6'}20` }}>
                        <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform" style={{ color: business?.primaryColor || '#3b82f6' }}>
                            <Lightbulb size={20} />
                        </div>
                        <div>
                            <p className="font-black text-xs uppercase tracking-widest mb-1 leading-none" style={{ color: business?.primaryColor || '#3b82f6' }}>Pro-Tip</p>
                            <p className="text-[13px] font-medium leading-relaxed opacity-70">
                                Detailed reviews help local businesses show up higher in search results.
                            </p>
                        </div>
                    </div>

                    <Button variant="ghost" className="text-zinc-400 font-bold uppercase tracking-widest text-[10px] hover:text-zinc-900">
                        Cancel Generation
                    </Button>
                </Card>
            </div>
        );
    }

    if (error || !business) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-zinc-50 text-center">
                <h1 className="text-2xl font-bold text-zinc-900 mb-2">Business Not Found</h1>
                <p className="text-zinc-500">The review page you are looking for doesn't exist.</p>
            </div>
        );
    }

    const { businessName, primaryColor, secondaryColor, googleReviewLink } = business;

    return (
        <div className="min-h-screen bg-zinc-50 flex justify-center py-12 px-6">
            <div className="w-full max-w-[500px] animate-fade-in-up">
                <div className="text-center mb-10">
                    <div className="w-24 h-24 bg-white rounded-[2rem] shadow-2xl flex items-center justify-center mx-auto mb-6 border-8 border-white group overflow-hidden">
                        {business.logoUrl ? (
                            <img src={business.logoUrl} alt={businessName} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                        ) : (
                            <div className="w-full h-full rounded-2xl flex items-center justify-center text-white transition-transform duration-500 group-hover:scale-110" style={{ backgroundColor: primaryColor }}>
                                <Sparkles size={40} />
                            </div>
                        )}
                    </div>
                    <h1 className="text-3xl font-black text-zinc-900 tracking-tight mb-3">{businessName}</h1>
                    <div className="flex justify-center gap-1.5 mb-2">
                        {[1, 2, 3, 4, 5].map(n => (
                            <Star key={n} size={20} className="fill-amber-400 text-amber-400 drop-shadow-sm" />
                        ))}
                    </div>
                    <p className="text-sm font-bold text-zinc-400 uppercase tracking-widest">Highly Rated Business</p>
                </div>

                <Card className="p-8 pb-10 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] border-zinc-100 relative group overflow-hidden">
                    {/* Background Glow */}
                    <div className="absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-1000" style={{ backgroundColor: `${primaryColor}20` }} />

                    <div className="relative">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-white text-[11px] font-black uppercase tracking-widest mb-8 shadow-lg translate-y-[-4px]" style={{ backgroundColor: '#10b981' }}>
                            <Sparkles size={12} strokeWidth={3} />
                            Suggested Review
                        </div>

                        <div className="relative mb-10">
                            <div className="text-6xl text-zinc-100 font-serif absolute -top-8 -left-4 pointer-events-none">"</div>
                            <p className="text-xl font-medium text-zinc-800 leading-relaxed italic z-10 relative">
                                {review}
                            </p>
                        </div>

                        <div className="grid grid-cols-1 gap-4">
                            <Button
                                fullWidth
                                size="lg"
                                className="h-16 rounded-[1.25rem] text-lg font-black shadow-xl"
                                icon={Copy}
                                onClick={copyReview}
                                style={{ backgroundColor: primaryColor, color: secondaryColor, boxShadow: `0 20px 25px -5px ${primaryColor}40` }}
                            >
                                Copy Review
                            </Button>
                            <Button
                                href={googleReviewLink}
                                target="_blank"
                                variant="secondary"
                                fullWidth
                                size="lg"
                                className="h-16 rounded-[1.25rem] bg-zinc-900 text-white border-zinc-900 hover:bg-black font-black text-lg gap-3"
                                icon={ExternalLink}
                            >
                                Post to Google Maps
                            </Button>
                        </div>
                    </div>
                </Card>

                <div className="mt-12 text-center">
                    <p className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em] mb-8">Follow & Find Us</p>
                    <div className="flex justify-center gap-8 mb-16">
                        {[Instagram, Facebook, Globe, MapPin].map((Icon, i) => (
                            <button key={i} className="w-12 h-12 flex items-center justify-center text-zinc-400 hover:bg-white hover:shadow-lg rounded-2xl transition-all duration-300" style={{ '--hover-color': primaryColor }}>
                                <Icon size={24} />
                            </button>
                        ))}
                    </div>

                    <Link to="/dashboard" className="inline-flex items-center gap-2 group">
                        <span className="text-[10px] font-black text-zinc-300 uppercase tracking-[0.2em] group-hover:text-zinc-600 transition-colors">
                            Built with <span style={{ color: `${primaryColor}80` }}>ReviewLink AI</span>
                        </span>
                        <ArrowRight size={10} className="text-zinc-300 group-hover:translate-x-1 transition-all" style={{ color: `${primaryColor}80` }} />
                    </Link>
                </div>
            </div>

            {showToast && (
                <div className="fixed bottom-10 left-1/2 -translate-x-1/2 bg-zinc-900 text-white px-8 py-5 rounded-[2rem] shadow-2xl flex items-center gap-4 z-50 animate-fade-in-up border border-white/10 backdrop-blur-xl">
                    <div className="w-8 h-8 bg-emerald-500 text-white rounded-full flex items-center justify-center shadow-lg shadow-emerald-500/40">
                        <CheckCircle2 size={18} strokeWidth={3} />
                    </div>
                    <div className="pr-4">
                        <p className="font-black text-sm tracking-tight">Review Copied!</p>
                        <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest mt-0.5">Now paste it on Google Maps</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PublicReviewPage;

