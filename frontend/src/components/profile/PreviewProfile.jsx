import React, { useMemo } from 'react';
import { Building2, Star, Globe, Instagram, Facebook, Twitter, MessageCircle, Mail, MapPin, Share2, Linkedin, Youtube, Phone } from 'lucide-react';
import { ThemeProvider, useTheme } from '../../themes/ThemeProvider';
import CardRenderer from './CardRenderer';
import { Link } from 'react-router-dom';

const GoogleIcon = ({ size = 20 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
        <path d="M21.35,11.1H12.18V13.83H18.69C18.36,17.64 15.19,19.27 12.19,19.27C9.03,19.27 6.48,16.68 6.48,12.12C6.48,7.56 9.03,4.97 12.19,4.97C14.1,4.97 15.83,5.71 17.1,7.02L19.16,4.96C17.46,3.15 14.87,2.24 12.19,2.24C6.73,2.24 2.12,6.67 2.12,12.12C2.12,17.57 6.73,22 12.19,22C17.54,22 21.61,18.15 21.61,12.12C21.61,11.73 21.57,11.33 21.35,11.1V11.1Z" />
    </svg>
);

const WhatsAppIcon = ({ size = 20 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
);

const iconMap = {
    website: Globe,
    instagram: Instagram,
    facebook: Facebook,
    twitter: Twitter,
    whatsapp: WhatsAppIcon,
    whatsapp_channel: WhatsAppIcon,
    email: Mail,
    location: MapPin,
    google: GoogleIcon,
    google_maps: MapPin,
    linkedin: Linkedin,
    youtube: Youtube,
    phone: Phone,
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
                    <img src="/Vector.svg" alt="L" className="w-5 h-auto" />
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
                        icon={GoogleIcon}
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
                        Join RevLinko
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
                        <div className="flex items-center gap-1.5 opacity-80">
                            <img src="/Vector.svg" alt="L" className="w-3 h-auto" />
                            <img src="/Vector2.svg" alt="RevLinko" className="h-2.5 w-auto grayscale brightness-50 contrast-200" style={{ filter: 'brightness(0) saturate(100%) invert(32%) sepia(9%) saturate(415%) hue-rotate(201deg) brightness(93%) contrast(85%)' }} />
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