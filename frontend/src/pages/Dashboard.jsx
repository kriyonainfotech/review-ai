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
    Share2,
    Copy,
    Check,
    Settings,
    Trash2,
    Link as LinkIcon,
    Globe,
    MapPin,
    Instagram,
    Facebook,
    Twitter,
    MessageCircle,
    Mail,
    Phone,
    Pencil,
    Eye,
    X
} from 'lucide-react';
import { QRCodeCanvas } from 'qrcode.react';
import { api } from '../api';
import PreviewProfile from '../components/profile/PreviewProfile';

const iconOptions = [
    { value: 'website', label: 'Website', icon: Globe },
    { value: 'location', label: 'Location', icon: MapPin },
    { value: 'instagram', label: 'Instagram', icon: Instagram },
    { value: 'facebook', label: 'Facebook', icon: Facebook },
    { value: 'twitter', label: 'Twitter', icon: Twitter },
    { value: 'whatsapp', label: 'WhatsApp', icon: MessageCircle },
    { value: 'email', label: 'Email', icon: Mail },
    { value: 'phone', label: 'Phone', icon: Phone },
];

const Dashboard = () => {
    const [business, setBusiness] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [copied, setCopied] = useState(false);
    const [reviewCopied, setReviewCopied] = useState(false);
    const [isAddingLink, setIsAddingLink] = useState(false);
    const [newLink, setNewLink] = useState({ type: 'website', label: '', url: '' });
    const [isSaving, setIsSaving] = useState(false);
    const [editingIndex, setEditingIndex] = useState(null);
    const [showMobilePreview, setShowMobilePreview] = useState(false);

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

    useEffect(() => {
        fetchBusiness();
    }, []);

    const copyLink = () => {
        const link = `${window.location.origin}/${business.slug || business.businessId}`;
        navigator.clipboard.writeText(link);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const copyReviewLink = () => {
        const link = `${window.location.origin}/${business.slug || business.businessId}/review`;
        navigator.clipboard.writeText(link);
        setReviewCopied(true);
        setTimeout(() => setReviewCopied(false), 2000);
    };

    const downloadReviewQr = () => {
        const canvas = document.createElement('canvas');
        const qrCanvas = document.querySelector('.review-qr canvas');
        if (!qrCanvas) return;

        const padding = 40;
        const size = qrCanvas.width + padding * 2;
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext('2d');

        // White background
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, size, size);

        // Draw QR
        ctx.drawImage(qrCanvas, padding, padding);

        // Download
        const link = document.createElement('a');
        link.download = `${business.slug}-review-qr.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
    };

    const handleAddLink = async (e) => {
        e.preventDefault();
        if (!newLink.url) return;

        setIsSaving(true);
        try {
            let updatedLinks;
            if (editingIndex !== null) {
                updatedLinks = business.links.map((link, i) =>
                    i === editingIndex ? { ...newLink, isActive: link.isActive } : link
                );
            } else {
                updatedLinks = [...(business.links || []), { ...newLink, isActive: true }];
            }

            const updatedBusiness = await api.updateBusiness(business._id, { links: updatedLinks });
            setBusiness(updatedBusiness);
            setIsAddingLink(false);
            setEditingIndex(null);
            setNewLink({ type: 'website', label: '', url: '' });
        } catch (err) {
            setError(editingIndex !== null ? 'Failed to update link' : 'Failed to add link');
        } finally {
            setIsSaving(false);
        }
    };

    const startEditing = (index) => {
        const link = business.links[index];
        setNewLink({ type: link.type, label: link.label || '', url: link.url });
        setEditingIndex(index);
        setIsAddingLink(true);
    };

    const handleDeleteLink = async (index) => {
        if (!window.confirm('Are you sure you want to delete this link?')) return;

        try {
            const updatedLinks = business.links.filter((_, i) => i !== index);
            const updatedBusiness = await api.updateBusiness(business._id, { links: updatedLinks });
            setBusiness(updatedBusiness);
        } catch (err) {
            setError('Failed to delete link');
        }
    };

    const toggleLinkStatus = async (index) => {
        try {
            const updatedLinks = business.links.map((link, i) =>
                i === index ? { ...link, isActive: !link.isActive } : link
            );
            const updatedBusiness = await api.updateBusiness(business._id, { links: updatedLinks });
            setBusiness(updatedBusiness);
        } catch (err) {
            setError('Failed to update link status');
        }
    };

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
        <div className="min-h-screen bg-zinc-50/50">
            <div className="p-4 sm:p-6 max-w-7xl mx-auto">
                {/* Header */}
                <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                    <div>
                        <h1 className="text-2xl font-black text-zinc-900 tracking-tight">Business Profile</h1>
                        <p className="text-zinc-500 text-sm font-medium mt-0.5">Customize your public presence.</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button
                            to={`/${business.slug}`}
                            target="_blank"
                            variant="secondary"
                            size="sm"
                            className="bg-white px-4 h-9"
                            icon={ExternalLink}
                        >
                            View Live
                        </Button>
                        <Button
                            to="/my-page"
                            size="sm"
                            className="bg-zinc-900 text-white hover:bg-zinc-800 px-4 h-9"
                            icon={Settings}
                        >
                            View Profile
                        </Button>
                    </div>
                </header>

                <div className="flex flex-col lg:flex-row gap-6">

                    {/* --- LEFT SIDE: Profile Management (70%) --- */}
                    <div className="flex-1 space-y-6">

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Public Profile Link Card */}
                            <Card className="p-4 bg-white border-zinc-100 shadow-sm overflow-hidden relative">
                                <div className="flex flex-col h-full justify-between gap-4 relative z-10">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2.5 bg-primary-50 text-primary-600 rounded-xl">
                                            <Share2 size={20} />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-zinc-900 text-sm">Profile Link</h3>
                                            <p className="text-zinc-400 text-[11px] font-medium truncate max-w-[180px]">revlinko.com/{business.slug}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 bg-zinc-50 p-1 rounded-xl border border-zinc-100 mt-auto">
                                        <button
                                            onClick={copyLink}
                                            className="flex-1 bg-white text-zinc-900 px-3 py-1.5 rounded-lg font-bold text-xs flex items-center justify-center gap-2 hover:bg-zinc-50 transition-all shadow-sm border border-zinc-100"
                                        >
                                            {copied ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
                                            {copied ? 'Copied' : 'Copy Link'}
                                        </button>
                                    </div>
                                </div>
                            </Card>

                            {/* AI Review Generator Link Card */}
                            <Card className="p-4 bg-white border-zinc-100 shadow-sm overflow-hidden relative">
                                <div className="flex flex-col h-full justify-between gap-4 relative z-10">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-xl">
                                            <Sparkles size={20} />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-zinc-900 text-sm">AI Review Generator</h3>
                                            <p className="text-zinc-400 text-[11px] font-medium truncate max-w-[180px]">revlinko.com/{business.slug}/review</p>
                                        </div>
                                    </div>

                                    {/* Small hidden QR for export functionality */}
                                    <div className="review-qr hidden">
                                        <QRCodeCanvas
                                            value={`${window.location.origin}/${business.slug}/review`}
                                            size={512}
                                            level="H"
                                        />
                                    </div>

                                    <div className="flex items-center gap-2 bg-zinc-50 p-1 rounded-xl border border-zinc-100 mt-auto">
                                        <button
                                            onClick={copyReviewLink}
                                            className="flex-1 bg-white text-zinc-900 px-3 py-1.5 rounded-lg font-bold text-xs flex items-center justify-center gap-2 hover:bg-zinc-50 transition-all shadow-sm border border-zinc-100 transition-all"
                                        >
                                            {reviewCopied ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
                                            {reviewCopied ? 'Copied' : 'Copy'}
                                        </button>
                                        <button
                                            onClick={downloadReviewQr}
                                            className="flex-1 bg-white text-zinc-900 px-3 py-1.5 rounded-lg font-bold text-xs flex items-center justify-center gap-2 hover:bg-zinc-50 transition-all shadow-sm border border-zinc-100"
                                        >
                                            <QrCode size={14} />
                                            QR Code
                                        </button>
                                    </div>
                                </div>
                            </Card>
                        </div>

                        {/* Links Management */}
                        <section className="space-y-4">
                            <div className="flex items-center justify-between px-1">
                                <h2 className="text-lg font-black text-zinc-900 tracking-tight flex items-center gap-2">
                                    <LinkIcon size={18} className="text-primary-600" />
                                    Profile Links
                                </h2>
                                <Button
                                    onClick={() => {
                                        setEditingIndex(null);
                                        setNewLink({ type: 'website', label: '', url: '' });
                                        setIsAddingLink(true);
                                    }}
                                    variant="secondary"
                                    size="sm"
                                    className="h-9 text-[11px] font-bold px-3"
                                    icon={Plus}
                                >
                                    Add New Link
                                </Button>
                            </div>

                            {isAddingLink && (
                                <Card className="p-4 border-primary-200 bg-primary-50/30 animate-in fade-in slide-in-from-top-4 duration-300">
                                    <form onSubmit={handleAddLink} className="space-y-4">
                                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                                            <div className="space-y-1">
                                                <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest ml-1">Type</label>
                                                <select
                                                    value={newLink.type}
                                                    onChange={(e) => setNewLink({ ...newLink, type: e.target.value })}
                                                    className="w-full h-10 px-3 rounded-xl border border-zinc-200 bg-white text-sm font-bold text-zinc-700 outline-none focus:ring-2 focus:ring-primary-500/20"
                                                >
                                                    {iconOptions.map(opt => (
                                                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div className="space-y-1">
                                                <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest ml-1">Label (Optional)</label>
                                                <input
                                                    type="text"
                                                    placeholder="e.g. Follow on Instagram"
                                                    value={newLink.label}
                                                    onChange={(e) => setNewLink({ ...newLink, label: e.target.value })}
                                                    className="w-full h-10 px-3 rounded-xl border border-zinc-200 bg-white text-sm font-bold text-zinc-900 outline-none focus:ring-2 focus:ring-primary-500/20"
                                                />
                                            </div>
                                            <div className="space-y-1 sm:col-span-2 md:col-span-1">
                                                <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest ml-1">URL</label>
                                                <input
                                                    type="url"
                                                    required
                                                    placeholder="https://..."
                                                    value={newLink.url}
                                                    onChange={(e) => setNewLink({ ...newLink, url: e.target.value })}
                                                    className="w-full h-10 px-3 rounded-xl border border-zinc-200 bg-white text-sm font-bold text-zinc-900 outline-none focus:ring-2 focus:ring-primary-500/20"
                                                />
                                            </div>
                                        </div>
                                        <div className="flex justify-end gap-2 pt-1">
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setIsAddingLink(false);
                                                    setEditingIndex(null);
                                                    setNewLink({ type: 'website', label: '', url: '' });
                                                }}
                                                className="px-4 py-2 text-xs font-bold text-zinc-500 hover:text-zinc-700 transition-colors"
                                            >
                                                Cancel
                                            </button>
                                            <Button
                                                type="submit"
                                                disabled={isSaving}
                                                size="sm"
                                                className="px-6 h-10 shadow-lg shadow-primary-500/10"
                                            >
                                                {isSaving ? <Loader2 className="animate-spin w-4 h-4" /> : (editingIndex !== null ? 'Update Link' : 'Save Link')}
                                            </Button>
                                        </div>
                                    </form>
                                </Card>
                            )}

                            <div className="grid gap-3">
                                {business.links && business.links.length > 0 ? (
                                    business.links.map((link, index) => {
                                        const Icon = iconOptions.find(opt => opt.value === link.type)?.icon || Globe;
                                        return (
                                            <Card key={index} className="p-3 flex items-center justify-between border-zinc-100 hover:border-zinc-200 transition-all bg-white shadow-xs group">
                                                <div className="flex items-center gap-3 min-w-0">
                                                    <div className="w-10 h-10 bg-zinc-50 text-zinc-500 rounded-lg flex items-center justify-center shrink-0">
                                                        <Icon size={18} />
                                                    </div>
                                                    <div className="min-w-0">
                                                        <h4 className="font-bold text-zinc-900 text-sm truncate">{link.label || link.type}</h4>
                                                        <p className="text-zinc-400 text-[10px] font-mono truncate max-w-[150px] sm:max-w-md">{link.url}</p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-1 sm:gap-2 shrink-0">
                                                    <button
                                                        onClick={() => startEditing(index)}
                                                        className="p-1.5 text-zinc-300 hover:text-primary-600 transition-colors"
                                                    >
                                                        <Pencil size={16} />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDeleteLink(index)}
                                                        className="p-1.5 text-zinc-300 hover:text-red-500 transition-colors"
                                                    >
                                                        <Trash2 size={16} />
                                                    </button>
                                                    <button
                                                        onClick={() => toggleLinkStatus(index)}
                                                        className={`w-8 h-5 rounded-full relative transition-colors duration-200 ml-1 ${link.isActive !== false ? 'bg-emerald-500' : 'bg-zinc-200'}`}
                                                    >
                                                        <div className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full transition-transform duration-200 ${link.isActive !== false ? 'translate-x-3' : ''}`} />
                                                    </button>
                                                </div>
                                            </Card>
                                        );
                                    })
                                ) : (
                                    <div className="text-center py-10 bg-white rounded-2xl border border-dashed border-zinc-200">
                                        <div className="w-10 h-10 bg-zinc-50 text-zinc-300 rounded-full flex items-center justify-center mx-auto mb-2">
                                            <LinkIcon size={20} />
                                        </div>
                                        <p className="text-zinc-400 text-sm font-medium">No links added yet.</p>
                                    </div>
                                )}
                            </div>
                        </section>
                    </div>

                    {/* --- RIGHT SIDE: Mobile Preview (Hidden on mobile/tablet) --- */}
                    <div className="hidden lg:block w-[340px] shrink-0">
                        <div className="sticky top-6">
                            {/* Phone Mockup - Thin Gray Border */}
                            <div className="relative mx-auto w-[300px] h-[600px] bg-white rounded-[2.5rem] p-0 shadow-2xl border border-zinc-200 overflow-hidden">
                                {/* Screen Content */}
                                <div className="w-full h-full bg-white rounded-[2.5rem] overflow-hidden overflow-y-auto no-scrollbar relative">
                                    <PreviewProfile business={business} isPreview={true} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Preview FAB */}
            <button
                onClick={() => setShowMobilePreview(true)}
                className="lg:hidden fixed bottom-6 right-6 w-14 h-14 bg-zinc-900 text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-40"
            >
                <Eye size={24} />
            </button>

            {/* Mobile Preview Overlay */}
            {showMobilePreview && (
                <div className="fixed inset-0 z-[100] bg-white animate-in fade-in slide-in-from-bottom-full duration-300 lg:hidden">
                    <div className="absolute top-4 right-4 z-[110]">
                        <button
                            onClick={() => setShowMobilePreview(false)}
                            className="w-10 h-10 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center text-zinc-900 shadow-lg border border-zinc-100"
                        >
                            <X size={20} />
                        </button>
                    </div>
                    <div className="h-full overflow-y-auto">
                        <PreviewProfile business={business} isPreview={false} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dashboard;
