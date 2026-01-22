import React, { useMemo } from 'react';
import { Building2, Sparkles, Star, Globe, Instagram, Facebook, Twitter, MessageCircle, Mail, MapPin, Share2 } from 'lucide-react';
import { ThemeProvider, useTheme } from '../../themes/ThemeProvider';
import CardRenderer from './CardRenderer';
import { Link } from 'react-router-dom';

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

const ProfileContent = ({ business, isPreview }) => {
    const { theme } = useTheme();

    const {
        businessName,
        businessDescription,
        businessServices,
        logoUrl,
        links = [],
        slug,
    } = business;

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
        <div
            className={`flex flex-col min-h-screen transition-all duration-500 ${isPreview ? 'rounded-[3rem] overflow-y-auto' : ''}`}
            style={{
                backgroundImage: 'var(--theme-bg-gradient)',
                backgroundSize: 'var(--theme-bg-size)',
                backgroundColor: 'var(--theme-bg)',
                fontFamily: 'var(--theme-font-body)'
            }}
        >
            {/* Header Actions */}
            <div className="flex items-center justify-between px-8 pt-8 pb-2 relative z-20">
                <div
                    className="w-10 h-10 bg-white/10 backdrop-blur-xl rounded-full flex items-center justify-center border border-white/20 shadow-xl"
                    style={{ color: 'var(--accent-color)' }}
                >
                    <Sparkles size={20} fill="currentColor" />
                </div>
                <button
                    onClick={sharePage}
                    className="w-10 h-10 bg-white/10 backdrop-blur-xl rounded-full flex items-center justify-center border border-white/20 shadow-xl transition-all hover:scale-110 active:scale-95 group"
                    style={{ color: 'var(--btn-text)' }}
                >
                    <Share2 size={18} className="group-hover:rotate-12 transition-transform" />
                </button>
            </div>

            <div className={`w-full max-w-[480px] mx-auto flex flex-col px-6 ${isPreview ? 'pb-8 pt-2' : 'pt-10 pb-16'}`}>
                {/* Profile Section */}
                <div className="text-center mb-8">
                    <div className="relative inline-block mb-6">
                        <div className={`relative ${isPreview ? 'w-20 h-20' : 'w-28 h-28'} bg-white/10 backdrop-blur-md rounded-full shadow-2xl flex items-center justify-center mx-auto border-[6px] border-white/20 overflow-hidden ring-1 ring-white/10`}>
                            {logoUrl ? (
                                <img src={logoUrl} alt={businessName} className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center bg-zinc-50/10">
                                    <Building2 size={isPreview ? 28 : 40} className="text-white/20" />
                                </div>
                            )}
                        </div>
                    </div>

                    <h1
                        className={`${isPreview ? 'text-2xl' : 'text-3xl'} font-extrabold tracking-tight mb-3`}
                        style={{ color: 'var(--theme-text-primary)', fontFamily: 'var(--theme-font-title)' }}
                    >
                        {businessName}
                    </h1>
                </div>

                {/* Links Section */}
                <div className="space-y-4 mb-12">
                    {/* Primary Action: Google Review */}
                    <CardRenderer
                        label="Review us on Google"
                        url={`/${slug}/review`}
                        icon={Star}
                        primary={true}
                    />

                    {/* Other Links */}
                    {otherLinks.map((link, i) => (
                        <CardRenderer
                            key={i}
                            label={link.label || link.type}
                            url={link.url}
                            icon={iconMap[link.type?.toLowerCase()] || iconMap.default}
                        />
                    ))}
                </div>

                {/* Footer Section */}
                <footer className="mt-auto py-8 text-center flex flex-col items-center gap-6">
                    <Link
                        to="/register"
                        className="px-8 py-3 rounded-full text-sm font-bold shadow-xl transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
                        style={{
                            backgroundColor: 'var(--accent-color)',
                            color: 'var(--btn-text)',
                            fontFamily: 'var(--theme-font-title)',
                        }}
                    >
                        Join {businessName} on RevLinko
                    </Link>

                    <div className="flex items-center gap-4 text-[10px] font-medium tracking-wider opacity-60" style={{ color: 'var(--btn-text)', fontFamily: 'var(--theme-font-title)' }}>
                        <Link to="/privacy" className="hover:opacity-100 transition-opacity">Privacy Policy</Link>
                        <span className="w-1 h-1 rounded-full bg-current opacity-50"></span>
                        <Link to="/terms" className="hover:opacity-100 transition-opacity">Terms of Service</Link>
                        <span className="w-1 h-1 rounded-full bg-current opacity-50"></span>
                        <Link to="/cookies" className="hover:opacity-100 transition-opacity">Cookies</Link>
                    </div>
                    <div className="flex items-center gap-2 text-[10px] font-black tracking-[0.2em] uppercase opacity-70" style={{ color: 'var(--btn-text)', fontFamily: 'var(--theme-font-title)' }}>
                        <span>Powered by</span>
                        <div className="flex items-center gap-1" style={{ color: 'var(--accent-color)' }}>
                            <Sparkles size={10} fill="currentColor" />
                            <span>RevLinko</span>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    );
};

const PreviewProfile = ({ business, isPreview = false }) => {
    if (!business) return null;

    return (
        <SafeThemeProvider business={business}>
            <ProfileContent business={business} isPreview={isPreview} />
        </SafeThemeProvider>
    );
};

const SafeThemeProvider = ({ business, children }) => {
    try {
        useTheme();
        return <>{children}</>;
    } catch (e) {
        let customOverrides = null;
        try {
            if (business.customConfig) {
                customOverrides = typeof business.customConfig === 'string'
                    ? JSON.parse(business.customConfig)
                    : business.customConfig;
            }
        } catch (err) {
            customOverrides = null;
        }

        return (
            <ThemeProvider
                initialThemeId={business.themeId || 'clean_white'}
                customOverrides={customOverrides}
            >
                {children}
            </ThemeProvider>
        );
    }
};

export default PreviewProfile;