import React, { useEffect, useState, useRef } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { Download, ArrowLeft, RefreshCw, QrCode, Eye, Share2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { api } from '../api';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import { ThemeProvider } from '../themes/ThemeProvider';
import PreviewProfile from '../components/profile/PreviewProfile';

const QRCodeScreen = () => {
    const navigate = useNavigate();
    const [business, setBusiness] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const qrRef = useRef(null);

    const fetchBusiness = async () => {
        try {
            setLoading(true);
            const data = await api.getMyBusiness();
            setBusiness(data);
        } catch (err) {
            setError('Failed to fetch business details');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBusiness();
    }, []);

    const downloadQR = () => {
        const canvas = qrRef.current.querySelector('canvas');
        if (!canvas) return;

        const padding = 60;
        const size = canvas.width + padding * 2;
        const mainCanvas = document.createElement('canvas');
        mainCanvas.width = size;
        mainCanvas.height = size + 100; // Extra space for text
        const ctx = mainCanvas.getContext('2d');

        // White background with rounded corners
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.roundRect(0, 0, mainCanvas.width, mainCanvas.height, 40);
        ctx.fill();

        // Draw QR
        ctx.drawImage(canvas, padding, padding);

        // Add Text
        ctx.fillStyle = '#18181b';
        ctx.textAlign = 'center';
        ctx.font = '900 24px Inter, sans-serif';
        ctx.fillText(`Scan to Review`, size / 2, size + 20);

        ctx.font = '600 18px Inter, sans-serif';
        ctx.fillStyle = '#71717a';
        ctx.fillText(business.businessName, size / 2, size + 50);

        const link = document.createElement('a');
        link.download = `${business.slug}-qr-code.png`;
        link.href = mainCanvas.toDataURL('image/png');
        link.click();
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-zinc-50">
                <RefreshCw className="w-8 h-8 animate-spin text-primary-600" />
            </div>
        );
    }

    if (!business) return null;

    const trackingUrl = `http://localhost:5000/api/business/t/${business.slug}`;

    return (
        <div className="min-h-screen bg-zinc-50/50 p-4 md:p-8">
            <div className="max-w-5xl mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <button
                        onClick={() => navigate('/dashboard')}
                        className="flex items-center gap-2 text-zinc-500 hover:text-zinc-900 transition-colors font-bold text-sm"
                    >
                        <ArrowLeft size={18} />
                        Back
                    </button>
                    <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-600 rounded-full text-xs font-black uppercase tracking-widest border border-emerald-100">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                        Live Tracking Active
                    </div>
                </div>

                <div className="grid lg:grid-cols-2 gap-8 items-start">
                    {/* Left: QR Content */}
                    <div className="space-y-6">
                        <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-premium border border-zinc-100 text-center">
                            <h1 className="text-3xl font-black text-zinc-900 tracking-tight mb-2">Trackable QR Code</h1>
                            <p className="text-zinc-500 text-sm font-medium mb-10 max-w-sm mx-auto leading-relaxed">
                                Use this QR for print, stickers, or digital sharing. Every scan is tracked in real-time.
                            </p>

                            <div ref={qrRef} className="inline-block p-6 bg-white rounded-3xl shadow-xl border border-zinc-50 mb-10">
                                <QRCodeCanvas
                                    value={trackingUrl}
                                    size={240}
                                    level="H"
                                    includeMargin={false}
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4 mb-8">
                                <div className="p-4 bg-zinc-50 rounded-2xl border border-zinc-100">
                                    <div className="flex items-center justify-center gap-2 text-primary-600 mb-1">
                                        <QrCode size={16} />
                                        <span className="text-[10px] font-black uppercase tracking-wider">Total Scans</span>
                                    </div>
                                    <span className="text-2xl font-black text-zinc-900">{business.qrScanCount || 0}</span>
                                </div>
                                <div className="p-4 bg-zinc-50 rounded-2xl border border-zinc-100">
                                    <div className="flex items-center justify-center gap-2 text-indigo-600 mb-1">
                                        <Share2 size={16} />
                                        <span className="text-[10px] font-black uppercase tracking-wider">Status</span>
                                    </div>
                                    <span className="text-sm font-black text-emerald-600 uppercase tracking-widest">Active</span>
                                </div>
                            </div>

                            <Button onClick={downloadQR} className="w-full h-14 rounded-2xl shadow-xl shadow-primary-500/10" icon={Download}>
                                Download High-Res QR
                            </Button>
                        </div>

                        {/* Info Card */}
                        <Card className="p-6 bg-indigo-600 text-white border-none shadow-xl shadow-indigo-500/20">
                            <div className="flex gap-4">
                                <div className="bg-gray-800 p-3 rounded-2xl h-fit">
                                    <Eye className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg mb-1">Smart Tracking</h3>
                                    <p className="text-gray-900 text-xs leading-relaxed opacity-80">
                                        Even if customers download or print this QR, we can still track every single scan through our smart redirection system.
                                    </p>
                                </div>
                            </div>
                        </Card>
                    </div>

                    {/* Right: Theme Preview Mockup */}
                    <div className="hidden lg:block sticky top-8">
                        <div className="relative mx-auto w-[320px] h-[640px] bg-white rounded-[3rem] p-0 shadow-[0_0_0_12px_#18181b,0_20px_50px_rgba(0,0,0,0.3)] border-[1px] border-[#18181b] overflow-hidden scale-90 origin-top">
                            {/* Screen Content */}
                            <div className="w-full h-full bg-white overflow-hidden overflow-y-auto no-scrollbar relative">
                                <ThemeProvider initialThemeId={business.themeId} customOverrides={business.customConfig ? JSON.parse(business.customConfig) : null}>
                                    <PreviewProfile business={business} isPreview={true} />
                                </ThemeProvider>
                            </div>
                            {/* Home Indicator */}
                            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-24 h-1 bg-black/10 rounded-full z-[100]" />
                        </div>
                        <p className="text-center text-zinc-400 text-[10px] font-bold uppercase tracking-widest mt-4">Profile Preview with Active Theme</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QRCodeScreen;
