import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Button from '../components/ui/Button';
import {
    Star,
    MessageCircle,
    Globe,
    Instagram,
    MapPin,
    Mail,
    Twitter,
    Facebook,
    Share2,
    Coffee,
    Loader2,
    Building2
} from 'lucide-react';
import { api } from '../api';

const LinkInBioPage = () => {
    const { id: slug } = useParams();
    const [business, setBusiness] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchBusiness = async () => {
            try {
                const data = await api.getBusinessBySlug(slug);
                setBusiness(data);
            } catch (err) {
                setError('Page not found');
            } finally {
                setLoading(false);
            }
        };

        if (slug) fetchBusiness();
    }, [slug]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center p-6 bg-zinc-50">
                <Loader2 size={40} className="animate-spin text-primary-600" />
            </div>
        );
    }

    if (error || !business) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-zinc-50 text-center">
                <h1 className="text-2xl font-bold text-zinc-900 mb-2">Page Not Found</h1>
                <p className="text-zinc-500">The business profile you are looking for doesn't exist.</p>
            </div>
        );
    }

    const {
        businessName,
        businessDescription,
        businessServices,
        primaryColor,
        secondaryColor,
        googleReviewLink,
        logoUrl,
        links = []
    } = business;

    // Derived services array
    const services = businessServices ? businessServices.split(',').map(s => s.trim()) : [];

    return (
        <div className="min-h-screen bg-zinc-50 flex justify-center selection:bg-primary-100" style={{ '--primary-client': primaryColor, '--secondary-client': secondaryColor }}>
            <div className="w-full max-w-[480px] bg-white min-h-screen shadow-2xl relative flex flex-col px-6 py-16">
                {/* Header Decoration */}
                <div className="absolute top-0 left-0 right-0 h-48" style={{ background: `linear-gradient(to bottom, ${primaryColor}15, white)` }} />

                <div className="relative z-10 text-center mb-12">
                    <div className="inline-block relative mb-8">
                        <div className="absolute inset-0 bg-white/40 blur-2xl rounded-full scale-150 animate-pulse" />
                        <div className="relative w-28 h-28 bg-white rounded-[2.5rem] shadow-2xl flex items-center justify-center mx-auto border-[6px] border-white group overflow-hidden">
                            {logoUrl ? (
                                <img src={logoUrl} alt={businessName} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                            ) : (
                                <div className="w-full h-full rounded-[2rem] flex items-center justify-center text-white shadow-inner group-hover:scale-105 transition-transform duration-500" style={{ backgroundColor: primaryColor }}>
                                    <Building2 size={48} strokeWidth={1.5} />
                                </div>
                            )}
                        </div>
                    </div>
                    <h1 className="text-3xl font-black text-zinc-900 tracking-tight mb-3">
                        {businessName}
                    </h1>
                    <p className="text-zinc-500 font-medium px-4 leading-relaxed mb-4">
                        {businessDescription || "Welcome to our business page!"}
                    </p>

                    {services.length > 0 && (
                        <div className="flex flex-wrap justify-center gap-2 px-4">
                            {services.map((service, i) => (
                                <span key={i} className="px-3 py-1 bg-zinc-100 text-zinc-600 rounded-full text-[10px] font-bold uppercase tracking-widest border border-zinc-200">
                                    {service}
                                </span>
                            ))}
                        </div>
                    )}
                </div>

                <div className="relative z-10 space-y-4 flex-1">
                    {/* Primary Review Link */}
                    <Button
                        href={`/r/${slug}/review`}
                        fullWidth
                        size="lg"
                        className="h-16 rounded-3xl text-lg font-black shadow-2xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                        icon={Star}
                        style={{ backgroundColor: primaryColor, color: secondaryColor, boxShadow: `0 20px 25px -5px ${primaryColor}40` }}
                    >
                        Leave a Google Review
                    </Button>

                    {links.map((link, i) => (
                        <Button
                            key={i}
                            href={link.url}
                            target="_blank"
                            variant="secondary"
                            fullWidth
                            className="group relative flex items-center gap-5 p-5 h-auto text-left rounded-[2rem] transition-all duration-300 bg-white border-zinc-100 hover:border-zinc-200 hover:shadow-lg shadow-sm border py-5"
                        >
                            <div className="w-14 h-14 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 duration-300 bg-zinc-50 text-zinc-600">
                                <Globe size={26} strokeWidth={2} />
                            </div>
                            <div className="flex-1">
                                <span className="block text-lg font-black tracking-tight leading-none mb-1">
                                    {link.label || link.type}
                                </span>
                                <span className="text-xs font-bold uppercase tracking-widest opacity-70">
                                    {link.type}
                                </span>
                            </div>
                            <Share2 size={18} className="opacity-0 group-hover:opacity-40 transition-opacity mr-2" />
                        </Button>
                    ))}
                </div>

                <footer className="relative z-10 mt-16 text-center">
                    <div className="flex justify-center gap-6 mb-8">
                        {[Instagram, Facebook, Twitter].map((Icon, i) => (
                            <a key={i} href="#" className="w-10 h-10 flex items-center justify-center text-zinc-300 hover:text-zinc-600 transition-colors">
                                <Icon size={20} />
                            </a>
                        ))}
                    </div>
                    <p className="text-[10px] font-black tracking-[0.2em] text-zinc-400 uppercase">
                        Powering digital presence by <span style={{ color: primaryColor }}>ReviewLink AI</span>
                    </p>
                </footer>
            </div>
        </div>
    );
};

export default LinkInBioPage;

