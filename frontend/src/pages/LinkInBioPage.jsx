import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { QRCodeCanvas } from 'qrcode.react';
import { api } from '../api';
import { ThemeProvider } from '../themes/ThemeProvider';
import PreviewProfile from '../components/profile/PreviewProfile';

const LinkInBioContent = ({ business }) => {
    const shareUrl = window.location.href;

    return (
        <div
            className="min-h-screen flex items-center justify-center overflow-x-hidden relative transition-all duration-500"
            style={{
                backgroundImage: 'var(--theme-bg-gradient)',
                backgroundSize: 'var(--theme-bg-size)',
                backgroundColor: 'var(--theme-bg)'
            }}
        >
            {/* Background Blur Overlay for the outer area */}
            <div className="absolute inset-0 bg-black/10 backdrop-blur-[4px] z-0 pointer-events-none" />

            {/* Desktop: Smooth Floating Card view */}
            <div className="z-10 w-full max-w-md sm:max-w-lg md:max-w-[480px] h-screen sm:h-[92vh] sm:my-4 bg-transparent sm:bg-white/5 sm:backdrop-blur-sm sm:rounded-[3rem] sm:shadow-[0_20px_50px_rgba(0,0,0,0.1)] overflow-y-auto relative border-none">
                <PreviewProfile business={business} isPreview={true} />
            </div>

            {/* Desktop Only: QR Code */}
            <div className="hidden lg:flex fixed bottom-10 right-10 flex-col items-center gap-3">
                <div className="bg-white p-3 rounded-2xl shadow-2xl">
                    <QRCodeCanvas
                        value={shareUrl}
                        size={100}
                        bgColor="#ffffff"
                        fgColor="#000000"
                        level="H"
                    />
                </div>
                <div className="text-center">
                    <p className="text-[10px] font-bold text-black uppercase tracking-widest opacity-40">View on mobile</p>
                </div>
            </div>
        </div>
    );
};

const LinkInBioPage = () => {
    const { id: slug } = useParams();
    const [business, setBusiness] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchBusiness = async () => {
            try {
                const data = await api.getBusinessByIdentifier(slug);
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
            <div className="min-h-screen flex items-center justify-center p-6 bg-[#0a0a0a]">
                <Loader2 size={40} className="animate-spin text-white/20" />
            </div>
        );
    }

    if (error || !business) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-[#0a0a0a] text-center text-white">
                <h1 className="text-2xl font-bold mb-2">Page Not Found</h1>
                <p className="text-white/50">The business profile you are looking for doesn't exist.</p>
            </div>
        );
    }

    // Parse Theme Config
    let customOverrides = null;
    try {
        if (business.customConfig) {
            customOverrides = typeof business.customConfig === 'string'
                ? JSON.parse(business.customConfig)
                : business.customConfig;
        }
    } catch (e) {
        customOverrides = null;
    }

    return (
        <ThemeProvider initialThemeId={business.themeId || 'clean_white'} customOverrides={customOverrides}>
            <LinkInBioContent business={business} />
        </ThemeProvider>
    );
};

export default LinkInBioPage;

