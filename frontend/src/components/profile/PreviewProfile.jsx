import React from 'react';
import { Building2, Sparkles, Star, Globe, Instagram, Facebook, Twitter, MessageCircle, Mail, MapPin, Share2, ChevronRight } from 'lucide-react';
import Button from '../ui/Button';

const GoogleIcon = ({ size = 20 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
        <path d="M21.35,11.1H12.18V13.83H18.69C18.36,17.64 15.19,19.27 12.19,19.27C9.03,19.27 6.48,16.68 6.48,12.12C6.48,7.56 9.03,4.97 12.19,4.97C14.1,4.97 15.83,5.71 17.1,7.02L19.16,4.96C17.46,3.15 14.87,2.24 12.19,2.24C6.73,2.24 2.12,6.67 2.12,12.12C2.12,17.57 6.73,22 12.19,22C17.54,22 21.61,18.15 21.61,12.12C21.61,11.73 21.57,11.33 21.35,11.1V11.1Z" />
    </svg>
);

const iconMap = {
    website: Globe,
    instagram: Instagram,
    facebook: Facebook,
    twitter: Twitter,
    whatsapp: MessageCircle,
    email: Mail,
    location: MapPin,
    google: GoogleIcon,
    google_maps: MapPin,
    default: Globe
};

const PreviewProfile = ({ business, isPreview = false }) => {
    if (!business) return null;

    const {
        businessName,
        businessDescription,
        businessServices,
        primaryColor = '#3b82f6',
        secondaryColor = '#ffffff',
        logoUrl,
        links = [],
        slug
    } = business;

    const services = businessServices ? businessServices.split(',').map(s => s.trim()) : [];
    const activeLinks = links.filter(l => l.isActive !== false);
    const locationLink = activeLinks.find(l => l.type?.toLowerCase() === 'location' || l.type?.toLowerCase() === 'google_maps');
    const otherLinks = activeLinks.filter(l => l !== locationLink);

    const sharePage = () => {
        if (navigator.share) {
            navigator.share({
                title: businessName,
                text: businessDescription,
                url: window.location.href,
            });
        }
    };

    return (
        <div className={`flex flex-col min-h-screen bg-white font-sans selection:bg-blue-100 ${isPreview ? 'rounded-[3rem] overflow-hidden max-h-[800px]' : ''}`}
            style={{ '--primary-client': primaryColor, '--secondary-client': secondaryColor }}>

            {/* Sticky Header */}
            {!isPreview && (
                <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-md px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="text-primary-600">
                            <Sparkles size={24} fill="currentColor" />
                        </div>
                        <span className="text-lg font-black tracking-tight text-zinc-900">RevLinko</span>
                    </div>
                    <button
                        onClick={sharePage}
                        className="p-2.5 bg-zinc-50 text-zinc-600 rounded-full hover:bg-zinc-100 transition-colors"
                    >
                        <Share2 size={20} />
                    </button>
                </div>
            )}

            <div className={`w-full max-w-[480px] mx-auto flex flex-col px-6 ${isPreview ? 'py-8' : 'pt-3 pb-16'}`}>

                {/* Profile Section */}
                <div className="text-center mb-5">
                    <div className="relative inline-block mb-6">
                        <div className={`relative ${isPreview ? 'w-20 h-20' : 'w-28 h-28'} bg-white rounded-full shadow-2xl flex items-center justify-center mx-auto border-[6px] border-white overflow-hidden ring-1 ring-zinc-100`}>
                            {logoUrl ? (
                                <img src={logoUrl} alt={businessName} className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center bg-zinc-50">
                                    <Building2 size={isPreview ? 28 : 40} className="text-zinc-200" />
                                </div>
                            )}
                            {/* Subtle Overlay Pattern for logo placeholder if no url */}
                            {!logoUrl && (
                                <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]" />
                            )}
                        </div>
                    </div>

                    <h1 className={`${isPreview ? 'text-xl' : 'text-2xl'} font-extrabold text-zinc-900 tracking-tight mb-2`}>
                        {businessName}
                    </h1>
                </div>

                {/* Links Section */}
                <div className="space-y-4 mb-12">
                    {/* Primary Action: Google Review */}
                    <a
                        href={`/${slug}/review`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative flex items-center gap-3 w-full bg-primary-600 hover:bg-primary-700 text-white rounded-[1.25rem] p-2.5 transition-all duration-300 shadow-xl shadow-primary-500/25 active:scale-[0.98]"
                    >
                        <div className="w-9 h-9 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm group-hover:scale-110 transition-transform duration-300">
                            <Star size={18} fill="currentColor" />
                        </div>
                        <span className={`flex-1 font-bold tracking-tight ${isPreview ? 'text-[13px]' : 'text-[15px]'}`}>
                            AI Google Review
                        </span>
                        <ChevronRight size={16} className="mr-1 opacity-60 group-hover:translate-x-1 transition-transform" />
                    </a>

                    {/* Other Links */}
                    {otherLinks.map((link, i) => {
                        const Icon = iconMap[link.type?.toLowerCase()] || iconMap.default;
                        return (
                            <a
                                key={i}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group relative flex items-center gap-3 w-full bg-white border border-zinc-100 hover:border-zinc-200 text-zinc-900 rounded-[1.25rem] p-2.5 transition-all duration-300 shadow-sm hover:shadow-md active:scale-[0.98]"
                            >
                                <div className="w-9 h-9 bg-zinc-50 rounded-lg flex items-center justify-center text-zinc-600 group-hover:bg-zinc-100 transition-colors">
                                    <Icon size={18} strokeWidth={2.5} />
                                </div>
                                <span className={`flex-1 font-bold tracking-tight ${isPreview ? 'text-[11px]' : 'text-[14px]'}`}>
                                    {link.label || link.type}
                                </span>
                                <ChevronRight size={16} className="mr-1 opacity-30 group-hover:translate-x-1 transition-transform" />
                            </a>
                        );
                    })}
                </div>

                {/* Location Section */}
                {locationLink && (
                    <div className="mb-12">
                        <a
                            href={locationLink.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group relative block w-full aspect-[2/1] bg-zinc-100 rounded-[2rem] overflow-hidden border-4 border-white shadow-xl isolate active:scale-[0.98] transition-transform"
                        >
                            {/* Map Background Pattern */}
                            <div className="absolute inset-0 opacity-40 pointer-events-none">
                                <img
                                    src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&q=80&w=800"
                                    alt="Map Background"
                                    className="w-full h-full object-cover filter grayscale sepia brightness-50 contrast-125"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                            </div>

                            <div className="absolute inset-0 flex items-end p-6">
                                <div className="flex items-center gap-3 bg-white px-4 py-2.5 rounded-2xl shadow-lg group-hover:scale-105 transition-transform">
                                    <div className="w-6 h-6 bg-red-50 text-red-500 rounded-full flex items-center justify-center">
                                        <MapPin size={14} fill="currentColor" />
                                    </div>
                                    <span className="text-sm font-bold text-zinc-900">Visit our location</span>
                                </div>
                            </div>
                        </a>
                    </div>
                )}

                {/* Footer Section */}
                <footer className="mt-auto py-8 text-center flex flex-col items-center gap-4">
                    <div className="flex items-center gap-2 text-[10px] font-black tracking-[0.2em] text-zinc-400 uppercase">
                        <span>Powered by</span>
                        <div className="flex items-center gap-1 text-primary-600">
                            <Sparkles size={10} fill="currentColor" />
                            <span>RevLinko</span>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    );
};

export default PreviewProfile;
