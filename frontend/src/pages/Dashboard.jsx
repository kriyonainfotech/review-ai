import React, { useEffect, useState } from 'react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import {
    Plus,
    Building2,
    Sparkles,
    Loader2,
    ExternalLink,
    QrCode,
    Download,
    MessageSquareQuote
} from 'lucide-react';
import { QRCodeCanvas } from 'qrcode.react';
import { api } from '../api';

const Dashboard = () => {
    const [business, setBusiness] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const downloadQRCode = () => {
        const canvas = document.getElementById('qr-code-canvas');
        if (!canvas) return;
        const pngUrl = canvas
            .toDataURL('image/png')
            .replace('image/png', 'image/octet-stream');
        let downloadLink = document.createElement('a');
        downloadLink.href = pngUrl;
        downloadLink.download = `${business.businessName}-QR.png`;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    };

    useEffect(() => {
        const fetchBusiness = async () => {
            try {
                const data = await api.getMyBusiness();
                setBusiness(data);
            } catch (err) {
                if (err.message !== 'Business not found') {
                    setError('Failed to fetch business details.');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchBusiness();
    }, []);

    if (loading) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 text-zinc-400">
                <Loader2 className="w-12 h-12 animate-spin text-primary-600" />
                <p className="font-bold text-sm tracking-widest uppercase">Loading your dashboard...</p>
            </div>
        );
    }

    if (!business) {
        return (
            <div className="p-6 lg:p-12 animate-fade-in-up flex flex-col items-center justify-center min-h-[60vh] text-center">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-primary-50 text-primary-600 rounded-2xl sm:rounded-3xl flex items-center justify-center mb-6 sm:mb-8 shadow-inner shadow-primary-500/10">
                    <Building2 className="w-8 h-8 sm:w-10 sm:h-10" />
                </div>
                <h1 className="text-2xl sm:text-4xl font-extrabold text-zinc-900 tracking-tight mb-4">No Business Profile Found</h1>
                <p className="text-zinc-500 font-medium text-base sm:text-lg max-w-md mx-auto mb-8 sm:mb-10 leading-relaxed">
                    You haven't set up your business profile yet. Create one now to start collecting AI-powered reviews.
                </p>
                <Button to="/create-business" size="lg" className="h-14 sm:h-16 px-8 sm:px-10 shadow-xl shadow-primary-500/20 w-full sm:w-auto" icon={Plus}>
                    Create Business Profile
                </Button>
            </div>
        );
    }

    return (
        <div className="p-4 sm:p-8 lg:p-12 animate-fade-in-up">
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 sm:mb-10">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 tracking-tight">Welcome back!</h1>
                    <p className="text-sm sm:text-base text-zinc-500 font-medium mt-1">Here's what's happening with your business reviews today.</p>
                </div>
                <div className="grid grid-cols-1 sm:flex sm:flex-wrap items-center gap-3 w-full md:w-auto">
                    <div className="hidden">
                        <QRCodeCanvas
                            id="qr-code-canvas"
                            value={business.googleReviewLink}
                            size={512}
                            level={"H"}
                            includeMargin={true}
                        />
                    </div>
                    <Button
                        onClick={downloadQRCode}
                        variant="secondary"
                        className="h-11 w-full sm:w-auto"
                        icon={QrCode}
                    >
                        Download QR
                    </Button>
                    <Button
                        to={`/${business.businessId}/review`}
                        target="_blank"
                        rel="noopener noreferrer"
                        variant="secondary"
                        className="h-11 border-indigo-100 text-indigo-600 hover:bg-indigo-50 w-full sm:w-auto"
                        icon={MessageSquareQuote}
                    >
                        Review Page
                    </Button>
                    <Button to={`/create-business?edit=true`} className="h-11 shadow-lg shadow-primary-500/10 w-full sm:w-auto" icon={Plus}>
                        Edit Profile
                    </Button>
                </div>
            </header>

            <div className="grid grid-cols-1 gap-8 items-start">
                <Card className="p-5 sm:p-8 group shadow-xl border-zinc-100">
                    <div className="flex items-center justify-between mb-8 sm:mb-10 pb-6 border-b border-zinc-100">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-zinc-50 border border-zinc-100 rounded-xl sm:rounded-2xl flex items-center justify-center overflow-hidden shrink-0">
                                {business.logoUrl ? (
                                    <img src={business.logoUrl} alt={business.businessName} className="w-full h-full object-cover" />
                                ) : (
                                    <Building2 className="w-6 h-6 sm:w-8 sm:h-8" style={{ color: business.primaryColor }} />
                                )}
                            </div>
                            <div>
                                <h3 className="text-lg sm:text-xl font-black text-zinc-900 leading-tight">{business.businessName}</h3>
                                <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mt-1">Active Profile</p>
                            </div>
                        </div>

                    </div>

                    <div className="space-y-6 sm:space-y-8">
                        <div className="grid grid-cols-1 xs:grid-cols-2 gap-6">
                            <div>
                                <label className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em] block mb-2">Business ID</label>
                                <p className="text-sm font-bold text-zinc-900 bg-zinc-50 px-3 py-2 rounded-lg inline-block border border-zinc-100">{business.businessId}</p>
                            </div>
                            <div>
                                <label className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em] block mb-2">Primary Color</label>
                                <div className="flex items-center gap-2">
                                    <div className="w-6 h-6 rounded-lg border border-zinc-200" style={{ backgroundColor: business.primaryColor }}></div>
                                    <span className="text-xs font-mono font-bold text-zinc-500">{business.primaryColor}</span>
                                </div>
                            </div>
                        </div>

                        <div>
                            <label className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em] block mb-2">About the Business</label>
                            <p className="text-[13px] font-medium text-zinc-600 leading-relaxed border-l-4 border-zinc-100 pl-4 py-1">
                                {business.businessDescription || "No description provided yet."}
                            </p>
                        </div>

                        <div>
                            <label className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em] block mb-3">Services</label>
                            <div className="flex flex-wrap gap-2">
                                {business.businessServices ? (
                                    business.businessServices.split(',').map((service, i) => (
                                        <span key={i} className="px-2.5 py-1.5 bg-zinc-900 text-white rounded-lg text-[10px] sm:text-[11px] font-black uppercase tracking-widest shadow-sm">
                                            {service.trim()}
                                        </span>
                                    ))
                                ) : (
                                    <span className="text-zinc-400 text-[10px] font-bold uppercase italic">No services listed</span>
                                )}
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default Dashboard;
