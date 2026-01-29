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
    Youtube,
    Instagram,
    Facebook,
    Twitter,
    MessageCircle,
    Mail,
    Phone,
    Pencil,
    Eye,
    X,
    UserCircle,
    Save
} from 'lucide-react';
import { QRCodeCanvas } from 'qrcode.react';
import { api } from '../api';
import PreviewProfile from '../components/profile/PreviewProfile';
import { ThemeProvider } from '../themes/ThemeProvider';
import DesignPanel from '../components/dashboard/DesignPanel';
import { themePresets } from '../themes/themeConfig';
import MobileNav from '../components/layout/MobileNav';

const WhatsAppIcon = ({ size = 20 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
);

const iconOptions = [
    { value: 'whatsapp', label: 'WhatsApp', icon: WhatsAppIcon },
    { value: 'whatsapp_channel', label: 'WhatsApp Channel', icon: WhatsAppIcon },
    { value: 'location', label: 'Location', icon: MapPin },
    { value: 'youtube', label: 'YouTube', icon: Youtube },
    { value: 'instagram', label: 'Instagram', icon: Instagram },
    { value: 'facebook', label: 'Facebook', icon: Facebook },
    { value: 'website', label: 'Website', icon: Globe },
    { value: 'linkedin', label: 'LinkedIn', icon: LinkIcon },
    { value: 'twitter', label: 'Twitter', icon: Twitter },
    { value: 'email', label: 'Email', icon: Mail },
    { value: 'phone', label: 'Phone', icon: Phone },
];

// Reusable Form Component
const LinkInputForm = ({ linkData, setLinkData, onCancel, onSave, isSaving }) => {
    return (
        <Card className="p-4 border-primary-200 bg-primary-50/30 animate-in fade-in slide-in-from-top-4 duration-300">
            <form onSubmit={onSave} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                    <div className="space-y-1">
                        <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest ml-1">Type</label>
                        <select
                            value={linkData.type}
                            onChange={(e) => setLinkData({ ...linkData, type: e.target.value })}
                            className="w-full h-12 px-3 rounded-xl border border-zinc-200 bg-white text-base md:text-sm font-bold text-zinc-700 outline-none focus:ring-2 focus:ring-primary-500/20"
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
                            value={linkData.label}
                            onChange={(e) => setLinkData({ ...linkData, label: e.target.value })}
                            className="w-full h-12 px-3 rounded-xl border border-zinc-200 bg-white text-base md:text-sm font-bold text-zinc-900 outline-none focus:ring-2 focus:ring-primary-500/20"
                        />
                    </div>
                    <div className="space-y-1 sm:col-span-2 md:col-span-1">
                        <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest ml-1">
                            {(linkData.type === 'phone' || linkData.type === 'whatsapp') ? 'Phone Number' :
                                linkData.type === 'email' ? 'Email Address' :
                                    'URL'}
                        </label>
                        <input
                            type={(linkData.type === 'phone' || linkData.type === 'whatsapp') ? 'tel' : linkData.type === 'email' ? 'email' : 'url'}
                            required
                            pattern={(linkData.type === 'phone' || linkData.type === 'whatsapp') ? "[0-9]{10}" : undefined}
                            maxLength={(linkData.type === 'phone' || linkData.type === 'whatsapp') ? 10 : undefined}
                            placeholder={
                                (linkData.type === 'phone' || linkData.type === 'whatsapp') ? '1234567890' :
                                    linkData.type === 'email' ? 'example@email.com' :
                                        'https://...'
                            }
                            value={linkData.url}
                            onChange={(e) => {
                                const val = e.target.value;
                                if ((linkData.type === 'phone' || linkData.type === 'whatsapp') && !/^\d*$/.test(val)) return;
                                setLinkData({ ...linkData, url: val });
                            }}
                            className="w-full h-12 px-3 rounded-xl border border-zinc-200 bg-white text-base md:text-sm font-bold text-zinc-900 outline-none focus:ring-2 focus:ring-primary-500/20"
                        />
                    </div>
                </div>
                <div className="flex justify-end gap-2 pt-1">
                    <button
                        type="button"
                        onClick={onCancel}
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
                        {isSaving ? <Loader2 className="animate-spin w-4 h-4" /> : (onSave.name === 'handleUpdateLink' ? 'Update Link' : 'Save Link')}
                    </Button>
                </div>
            </form>
        </Card>
    );
};

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
    const [activeTab, setActiveTab] = useState('links'); // 'links' | 'design' | 'profile'
    const [isDesignDirty, setIsDesignDirty] = useState(false);

    // User State
    const [user, setUser] = useState(null);
    const [isSavingUser, setIsSavingUser] = useState(false);
    const [profileData, setProfileData] = useState({ name: '', phoneNumber: '' });

    // Theme/Design State
    const [currentThemeId, setCurrentThemeId] = useState('clean_white');
    const [customConfig, setCustomConfig] = useState(null);

    const fetchBusiness = async () => {
        try {
            const data = await api.getMyBusiness();
            setBusiness(data);
            if (data.themeId) setCurrentThemeId(data.themeId);
            if (data.customConfig) {
                try {
                    setCustomConfig(JSON.parse(data.customConfig));
                } catch (e) {
                    console.error("Failed to parse custom config");
                }
            }
        } catch (err) {
            if (err.message !== 'Business not found') {
                setError('Failed to fetch business details.');
            }
        } finally {
            setLoading(false);
        }
    };

    const fetchUser = async () => {
        try {
            const data = await api.getMe();
            setUser(data);
            setProfileData({
                name: data.name || '',
                phoneNumber: data.phoneNumber || ''
            });
        } catch (err) {
            console.error("Failed to fetch user");
        }
    };

    useEffect(() => {
        fetchBusiness();
        fetchUser();
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

    const handleSaveLink = async (e) => { // Renamed from handleAddLink
        e.preventDefault();
        if (!newLink.url) return;

        // Validation based on type
        if (newLink.type === 'phone' || newLink.type === 'whatsapp') {
            const phoneRegex = /^\d{10}$/;
            if (!phoneRegex.test(newLink.url)) {
                alert('Please enter a valid 10-digit phone number');
                return;
            }
        } else if (newLink.type === 'email') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(newLink.url)) {
                alert('Please enter a valid email address');
                return;
            }
        }


        setIsSaving(true);
        try {
            let linkToSave = { ...newLink };
            if (newLink.type === 'whatsapp' && /^\d+$/.test(newLink.url)) {
                // Automatically add 91 prefix if not present (assuming user enters 10 digits as validated)
                linkToSave.url = `https://wa.me/91${newLink.url}`;
            }

            let updatedLinks;
            if (editingIndex !== null) {
                updatedLinks = business.links.map((link, i) =>
                    i === editingIndex ? { ...linkToSave, isActive: link.isActive } : link
                );
            } else {
                updatedLinks = [...(business.links || []), { ...linkToSave, isActive: true }];
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
        let url = link.url;
        if (link.type === 'whatsapp') {
            // Extract trailing 10 digits if it matches standard wa.me format
            const match = url.match(/(?:wa\.me\/(?:91)?)(\d{10})$/);
            if (match) {
                url = match[1];
            }
        }
        setNewLink({ type: link.type, label: link.label || '', url: url });
        setEditingIndex(index);
        // setIsAddingLink(true); // Don't show top form
    };

    const handleDeleteLink = async (index) => {
        if (!window.confirm('Are you sure you want to delete this link?')) return;

        try {
            const updatedLinks = business.links.filter((_, i) => i !== index);
            const updatedBusiness = await api.updateBusiness(business._id, { links: updatedLinks });
            setBusiness(updatedBusiness);
            if (editingIndex === index) {
                setEditingIndex(null);
                setNewLink({ type: 'website', label: '', url: '' });
            }
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

    const handleDesignChange = (themeId, newConfig) => {
        setCurrentThemeId(themeId);
        setCustomConfig(newConfig);
        setIsDesignDirty(true);

        // Update local business state to keep it in sync for preview
        setBusiness(prev => ({
            ...prev,
            themeId,
            customConfig: newConfig ? JSON.stringify(newConfig) : null
        }));
    };

    const handleSaveDesign = async () => {
        setIsSaving(true);
        try {
            await api.updateBusiness(business._id, {
                themeId: currentThemeId,
                customConfig: customConfig ? JSON.stringify(customConfig) : null
            });
            setIsDesignDirty(false);
            // Optional: Show success toast
        } catch (err) {
            console.error('Failed to update design settings');
            setError('Failed to save design changes');
        } finally {
            setIsSaving(false);
        }
    };

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        setIsSavingUser(true);
        try {
            const updatedUser = await api.updateProfile(profileData);
            setUser(updatedUser);
            // Optionally show a success message
        } catch (err) {
            setError('Failed to update profile');
        } finally {
            setIsSavingUser(false);
        }
    };

    // Prepare business for preview with real-time overrides
    const businessForPreview = {
        ...business,
        themeId: currentThemeId,
        customConfig: customConfig ? JSON.stringify(customConfig) : business?.customConfig
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
                {/* Sticky Header Section */}
                <div className="sticky top-16 lg:top-0 z-30 -mx-4 sm:-mx-6 px-4 sm:px-6 py-3 bg-zinc-50/80 backdrop-blur-md border-b border-zinc-200/50 mb-6">
                    <div className="flex md:flex-col md:flex-row md:items-center justify-between gap-3">
                        <div className="flex items-center gap-4">
                            <div>
                                <h1 className="text-xl font-black text-zinc-900 tracking-tight">Your Profile</h1>
                            </div>
                            {/* Tabs (Integrated in Header) */}
                            <div className="hidden md:flex items-center gap-1 bg-zinc-100/50 p-1 rounded-xl border border-zinc-200/50">
                                <button
                                    onClick={() => setActiveTab('links')}
                                    className={`px-4 py-1.5 rounded-lg text-[11px] font-black transition-all ${activeTab === 'links' ? 'bg-white text-zinc-900 shadow-sm border border-zinc-100' : 'text-zinc-500 hover:text-zinc-700'}`}
                                >
                                    Links
                                </button>
                                <button
                                    onClick={() => setActiveTab('design')}
                                    className={`px-4 py-1.5 rounded-lg text-[11px] font-black transition-all ${activeTab === 'design' ? 'bg-white text-zinc-900 shadow-sm border border-zinc-100' : 'text-zinc-500 hover:text-zinc-700'}`}
                                >
                                    Design
                                </button>
                                <button
                                    onClick={() => setActiveTab('profile')}
                                    className={`px-4 py-1.5 rounded-lg text-[11px] font-black transition-all ${activeTab === 'profile' ? 'bg-white text-zinc-900 shadow-sm border border-zinc-100' : 'text-zinc-500 hover:text-zinc-700'}`}
                                >
                                    Profile
                                </button>
                            </div>
                        </div>
                        <div>
                            <Button
                                to={`/${business.slug}`}
                                target="_blank"
                                variant="secondary"
                                size="sm"
                                className="bg-white px-3 h-8 text-[11px]"
                                icon={ExternalLink}
                            >
                                View Live
                            </Button>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-0 md:gap-6">

                    {/* --- LEFT SIDE: Profile Management (70%) --- */}
                    <div className="flex-1 space-y-6">
                        <div className="flex flex-col gap-3">

                            {/* Public Profile Link Row */}
                            <Card className="p-3 md:rounded-xl border-zinc-100 shadow-sm bg-white hover:border-zinc-200 transition-all">
                                <div className="flex items-center justify-between gap-3">

                                    {/* Left Side: Icon & Text */}
                                    <div className="flex items-center gap-3 overflow-hidden">
                                        <div className="p-2 bg-primary-50 text-primary-600 rounded-lg shrink-0">
                                            <Share2 size={18} />
                                        </div>
                                        <div className="min-w-0">
                                            <h3 className="font-bold text-zinc-900 text-[13px]">Profile Link</h3>
                                            <p className="text-zinc-400 text-[11px] font-medium truncate">
                                                revlinko.com/{business.slug}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Right Side: Action Button */}
                                    <button
                                        onClick={copyLink}
                                        className="shrink-0 bg-white text-zinc-900 px-3 py-1.5 rounded-lg border border-zinc-200 font-semibold text-[11px] flex items-center gap-1.5 hover:bg-zinc-50 transition-all shadow-sm"
                                    >
                                        {copied ? <Check size={13} className="text-emerald-500" /> : <Copy size={13} />}
                                        {copied ? 'Copied' : 'Copy'}
                                    </button>
                                </div>
                            </Card>

                            {/* AI Review Generator Link Row */}
                            <Card className="p-3 md:rounded-xl border-zinc-100 shadow-sm bg-white hover:border-zinc-200 transition-all">
                                <div className="flex items-center justify-between gap-3">
                                    <div className="flex items-center gap-3 overflow-hidden">
                                        <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg shrink-0">
                                            <Sparkles size={18} />
                                        </div>
                                        <div className="min-w-0">
                                            <h3 className="font-bold text-zinc-900 text-[13px]">AI Review</h3>
                                            <p className="text-zinc-400 text-[11px] font-medium truncate">Get more reviews</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 shrink-0">
                                        <button
                                            onClick={copyReviewLink}
                                            className="bg-white text-zinc-900 px-3 py-1.5 rounded-lg border border-zinc-200 font-semibold text-[11px] flex items-center gap-1.5 hover:bg-zinc-50 transition-all shadow-sm"
                                        >
                                            {reviewCopied ? <Check size={13} className="text-emerald-500" /> : <Copy size={13} />}
                                            <span className="hidden sm:inline">{reviewCopied ? 'Copied' : 'Copy'}</span>
                                        </button>
                                        <Button
                                            to="/qr-code"
                                            variant="secondary"
                                            size="sm"
                                            className="bg-white px-3 py-1.5 h-8 text-[11px]"
                                            icon={QrCode}
                                        >
                                            QR
                                        </Button>
                                    </div>
                                </div>
                            </Card>

                            {/* QR Scan Statistics Row */}
                            <Card className="p-3 md:rounded-xl border-zinc-100 shadow-sm bg-white hover:border-zinc-200 transition-all">
                                <div className="flex items-center justify-between gap-3">
                                    <div className="flex items-center gap-3 overflow-hidden">
                                        <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg shrink-0">
                                            <QrCode size={18} />
                                        </div>
                                        <div className="min-w-0">
                                            <h3 className="font-bold text-zinc-900 text-[13px]">QR Stats</h3>
                                            <p className="text-zinc-400 text-[11px] font-medium truncate">Smart Scan Tracking</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 shrink-0">
                                        <div className="text-right">
                                            <div className="text-[13px] font-black text-zinc-900">{business.qrScanCount || 0}</div>
                                            <div className="text-[9px] font-bold text-zinc-400 uppercase tracking-tighter">Total Scans</div>
                                        </div>
                                        <Button
                                            to="/qr-code"
                                            variant="secondary"
                                            size="sm"
                                            className="bg-zinc-900 text-white hover:bg-zinc-800 px-3 py-1.5 h-8 text-[11px] border-none"
                                            icon={Eye}
                                        >
                                            Manage
                                        </Button>
                                    </div>
                                </div>
                            </Card>

                        </div>

                        {/* Links Management */}
                        {activeTab === 'links' ? (
                            <section className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                                <div className="flex items-center justify-between px-1">
                                    <h2 className="text-lg font-black text-zinc-900 tracking-tight flex items-center gap-2 px-4 md:px-0 mt-4 md:mt-0">
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
                                    <LinkInputForm
                                        linkData={newLink}
                                        setLinkData={setNewLink}
                                        onCancel={() => {
                                            setIsAddingLink(false);
                                            setNewLink({ type: 'website', label: '', url: '' });
                                        }}
                                        onSave={handleSaveLink}
                                        isSaving={isSaving}
                                    />
                                )}

                                <div className="grid gap-3">
                                    {business.links && business.links.length > 0 ? (
                                        business.links.map((link, index) => {
                                            if (editingIndex === index) {
                                                return (
                                                    <LinkInputForm
                                                        key={index}
                                                        linkData={newLink}
                                                        setLinkData={setNewLink}
                                                        onCancel={() => {
                                                            setEditingIndex(null);
                                                            setNewLink({ type: 'website', label: '', url: '' });
                                                        }}
                                                        onSave={handleSaveLink}
                                                        isSaving={isSaving}
                                                    />
                                                );
                                            }
                                            const Icon = iconOptions.find(opt => opt.value === link.type)?.icon || Globe;
                                            return (
                                                <Card key={index} className="p-4 flex items-center justify-between md:rounded-2xl md:border border-zinc-100 hover:border-zinc-200 transition-all bg-white md:shadow-premium group rounded-none border-x-0 border-t-0 border-b shadow-none">
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
                        ) : activeTab === 'design' ? (
                            /* --- DESIGN TAB --- */
                            <div className="animate-in fade-in slide-in-from-left-4 duration-300">
                                <DesignPanel
                                    currentThemeId={currentThemeId}
                                    customConfig={customConfig}
                                    onChange={handleDesignChange}
                                    onSave={handleSaveDesign}
                                    isDirty={isDesignDirty}
                                    isSaving={isSaving}
                                />
                            </div>
                        ) : (
                            /* --- PROFILE TAB --- */
                            <section className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                                <div className="px-1">
                                    <h2 className="text-lg font-black text-zinc-900 tracking-tight flex items-center gap-2">
                                        <UserCircle size={18} className="text-primary-600" />
                                        User Profile
                                    </h2>
                                    <p className="text-zinc-500 text-xs font-medium mt-1">Manage your personal account details.</p>
                                </div>

                                <Card className="p-6 bg-white border-zinc-100 shadow-premium md:rounded-2xl rounded-none border-x-0 border-t-0 border-b md:border">
                                    <form onSubmit={handleUpdateProfile} className="space-y-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest ml-1">Full Name</label>
                                                <input
                                                    type="text"
                                                    required
                                                    value={profileData.name}
                                                    onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                                                    placeholder="Enter your name"
                                                    className="w-full h-12 px-4 rounded-xl border border-zinc-200 bg-zinc-50/30 text-sm font-bold text-zinc-900 outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500/30 transition-all"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest ml-1">Email Address</label>
                                                <input
                                                    type="email"
                                                    disabled
                                                    value={user?.email || ''}
                                                    className="w-full h-12 px-4 rounded-xl border border-zinc-200 bg-zinc-100 text-sm font-bold text-zinc-500 outline-none cursor-not-allowed"
                                                />
                                                <p className="text-[10px] text-zinc-400 font-medium ml-1">Contact support to change your email.</p>
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest ml-1">Phone Number</label>
                                                <input
                                                    type="tel"
                                                    value={profileData.phoneNumber}
                                                    onChange={(e) => setProfileData({ ...profileData, phoneNumber: e.target.value })}
                                                    placeholder="+1 234 567 890"
                                                    className="w-full h-12 px-4 rounded-xl border border-zinc-200 bg-zinc-50/30 text-sm font-bold text-zinc-900 outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500/30 transition-all"
                                                />
                                            </div>
                                        </div>

                                        <div className="pt-4 border-t border-zinc-50 flex justify-end">
                                            <Button
                                                type="submit"
                                                disabled={isSavingUser}
                                                className="px-8 h-12 shadow-xl shadow-primary-500/10 min-w-[140px]"
                                                icon={isSavingUser ? Loader2 : Save}
                                            >
                                                {isSavingUser ? 'Saving...' : 'Save Changes'}
                                            </Button>
                                        </div>
                                    </form>
                                </Card>

                                {/* Account Information / Security Snippet */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="p-4 bg-amber-50 rounded-2xl border border-amber-100 flex items-start gap-4">
                                        <div className="p-2 bg-white rounded-xl text-amber-600 shadow-sm border border-amber-50">
                                            <Sparkles size={20} />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-zinc-900 text-sm">Account Status</h4>
                                            <p className="text-zinc-600 text-xs mt-0.5 leading-relaxed">Your account is active and on the premium beta plan.</p>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        )}
                    </div>

                    {/* --- RIGHT SIDE: Mobile Preview --- */}
                    <div className="hidden lg:block w-[340px] shrink-0">
                        <div className="sticky top-6">
                            {/* Phone Mockup */}
                            <div className="relative mx-auto w-[300px] h-[600px] bg-white rounded-[3rem] p-0 shadow-[0_0_0_10px_#18181b,0_20px_50px_rgba(0,0,0,0.3)] border-[1px] border-[#18181b] overflow-hidden">
                                {/* Screen Content */}
                                <div className="w-full h-full bg-white overflow-hidden overflow-y-auto no-scrollbar relative">
                                    <ThemeProvider initialThemeId={currentThemeId} customOverrides={customConfig}>
                                        <PreviewProfile business={businessForPreview} isPreview={true} />
                                    </ThemeProvider>
                                </div>
                                {/* Home Indicator */}
                                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-24 h-1 bg-black/10 rounded-full z-[100]" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

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
                        <ThemeProvider initialThemeId={currentThemeId} customOverrides={customConfig}>
                            <PreviewProfile business={business} isPreview={false} />
                        </ThemeProvider>
                    </div>
                </div>
            )}

            {/* Mobile Bottom Navigation */}
            <MobileNav
                activeTab={activeTab}
                onTabChange={setActiveTab}
                onShowPreview={() => setShowMobilePreview(true)}
            />
        </div>
    );
};

export default Dashboard;
