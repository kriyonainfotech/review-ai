import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import {
    Building2,
    ChevronRight,
    Loader2, Sparkles, X, UserPen, Check // Added icons
} from 'lucide-react';
import { api } from '../api';
import { compressImage } from '../utils/imageCompression';

const CreateBusiness = () => {

    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        businessId: '',
        businessName: '',
        googleReviewLink: '',
        slug: '',
        businessDescription: '',
        businessServices: '',
        primaryColor: '#3b82f6',
        secondaryColor: '#ffffff'
    });
    const [logo, setLogo] = useState(null);
    const [logoPreview, setLogoPreview] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [isEdit, setIsEdit] = useState(false);
    const [isViewOnly, setIsViewOnly] = useState(false);
    const [businessId_db, setBusinessId_db] = useState(null);

    useEffect(() => {
        fetchBusinessData();
    }, []);

    const fetchBusinessData = async () => {
        try {
            setLoading(true);
            const data = await api.getMyBusiness();
            if (data) {
                setFormData({
                    businessId: data.businessId || '',
                    businessName: data.businessName || '',
                    googleReviewLink: data.googleReviewLink || '',
                    slug: data.slug || '',
                    businessDescription: data.businessDescription || '',
                    businessServices: data.businessServices || '',
                    primaryColor: data.primaryColor || '#3b82f6',
                    secondaryColor: data.secondaryColor || '#ffffff'
                });
                setLogoPreview(data.logoUrl);
                setBusinessId_db(data._id);
                setIsEdit(true);
                setIsViewOnly(true);
            }
        } catch (err) {
            if (err.message !== 'Business not found') {
                setError('Failed to fetch business data.');
            }
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
        setError('');
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setLogo(file);
            setLogoPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const slug = formData.slug || formData.businessName.toLowerCase().replace(/ /g, '-').replace(/[^\w-]/g, '');

            const data = new FormData();
            Object.keys(formData).forEach(key => {
                data.append(key, formData[key]);
            });
            data.set('slug', slug);

            if (logo) {
                const compressedLogo = await compressImage(logo);
                data.append('logo', compressedLogo);
            }

            if (isEdit && businessId_db) {
                await api.updateBusiness(businessId_db, data);
            } else {
                await api.createBusiness(data);
            }


            navigate('/dashboard');
        } catch (err) {
            setError(err.message || 'Failed to save business profile.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {/* --- Main Content --- */}
            <div className="p-4 md:p-6 pb-28 md:pb-6 animate-fade-in-up"> {/* Added pb-28 for mobile scroll space */}
                <header className="mb-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <div className="flex items-center gap-2 text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-3">
                            <span>Dashboard</span>
                            <ChevronRight size={10} />
                            <span className="text-primary-600">
                                {isViewOnly ? 'View Page' : (isEdit ? 'Edit Page' : 'Create Page')}
                            </span>
                        </div>
                        <h1 className="text-xl font-extrabold text-zinc-900 tracking-tight mb-1">
                            {isViewOnly ? 'Business Page' : (isEdit ? 'Update Business Page' : 'Create Business Page')}
                        </h1>
                        <p className="text-zinc-500 font-medium text-sm">
                            {isViewOnly ? 'Your business identity and branding.' : 'Set up your AI-powered review page.'}
                        </p>
                    </div>

                    {/* DESKTOP Edit Button */}
                    {isViewOnly && (
                        <div className="hidden md:block">
                            <Button
                                onClick={() => setIsViewOnly(false)}
                                className="h-10 rounded-xl bg-zinc-900 text-white hover:bg-zinc-800 flex items-center gap-2 px-4"
                            >
                                <UserPen size={16} />
                                <span className="text-xs">Edit Page</span>
                            </Button>
                        </div>
                    )}
                </header>

                {error && (
                    <div className="mb-4 p-3 bg-red-50 border border-red-100 text-red-600 text-[13px] font-bold rounded-xl flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
                        {error}
                    </div>
                )}

                <Card className="p-6 md:p-8 border-zinc-100 shadow-lg">
                    {/* IMPORTANT: Added ID to form to connect external buttons */}
                    <form id="settings-form" onSubmit={handleSubmit} className="space-y-8" encType="multipart/form-data">

                        {/* ... (Keep ALL your existing Inputs/Sections exactly the same) ... */}
                        <section>
                            <div className="flex items-center gap-2 mb-6">
                                <div className="w-8 h-8 bg-primary-50 text-primary-600 rounded-lg flex items-center justify-center">
                                    <Building2 size={18} />
                                </div>
                                <h2 className="text-lg font-bold text-zinc-900">Business Identity</h2>
                            </div>

                            <div className="mb-8">
                                <label className="block text-xs font-bold text-zinc-700 mb-3 ml-1">Business Logo</label>
                                <div className="flex items-center gap-4">
                                    <div className="w-16 h-16 md:w-24 md:h-24 bg-zinc-50 border-2 border-dashed border-zinc-200 rounded-2xl flex items-center justify-center overflow-hidden shrink-0">
                                        {logoPreview ? (
                                            <img src={logoPreview} alt="Preview" className="w-full h-full object-contain" />
                                        ) : (
                                            <Building2 size={24} className="text-zinc-300" />
                                        )}
                                    </div>
                                    <div className="flex-1">
                                        <input
                                            type="file"
                                            id="logo"
                                            accept="image/*"
                                            onChange={handleFileChange}
                                            disabled={isViewOnly}
                                            className="hidden"
                                        />
                                        <label
                                            htmlFor="logo"
                                            className={`inline-flex items-center px-3 py-2 bg-white border border-zinc-200 rounded-lg text-xs font-bold text-zinc-700 cursor-pointer hover:bg-zinc-50 transition-colors shadow-sm ${isViewOnly ? 'pointer-events-none opacity-50' : ''}`}
                                        >
                                            Change Logo
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <Input
                                    label="Username"
                                    id="businessId"
                                    placeholder="revlinko.com/username"
                                    required
                                    value={formData.businessId}
                                    onChange={handleChange}
                                    readOnly={isViewOnly}
                                    className={`mb-0 ${isViewOnly ? 'opacity-75 cursor-default' : ''}`}
                                />
                                <Input
                                    label="Business Name"
                                    id="businessName"
                                    placeholder="e.g. Acme Coffee"
                                    required
                                    value={formData.businessName}
                                    onChange={handleChange}
                                    readOnly={isViewOnly}
                                    className={`mb-0 ${isViewOnly ? 'opacity-75 cursor-default' : ''}`}
                                />
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label htmlFor="businessDescription" className="block text-xs font-bold text-zinc-700 mb-1.5 ml-1">About the Business</label>
                                    <textarea
                                        id="businessDescription"
                                        placeholder="e.g., We are a family-owned Italian restaurant..."
                                        rows={4}
                                        value={formData.businessDescription}
                                        onChange={handleChange}
                                        readOnly={isViewOnly}
                                        className={`w-full px-3 py-2.5 rounded-xl border border-zinc-200 bg-white text-zinc-900 text-[14px] transition-all duration-200 outline-hidden focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 min-h-[80px] resize-none ${isViewOnly ? 'opacity-75 cursor-default' : ''}`}
                                    />
                                </div>

                                <Input
                                    label="Services (Comma separated)"
                                    id="businessServices"
                                    placeholder="e.g., Pizza, Pasta, Catering"
                                    value={formData.businessServices}
                                    onChange={handleChange}
                                    readOnly={isViewOnly}
                                    className={`mb-0 ${isViewOnly ? 'opacity-75 cursor-default' : ''}`}
                                />
                            </div>
                        </section>

                        <section className="pt-8 border-t border-zinc-100">
                            <div className="flex items-center gap-2 mb-6">
                                <div className="w-8 h-8 bg-primary-50 text-primary-600 rounded-lg flex items-center justify-center">
                                    <Sparkles size={18} />
                                </div>
                                <h2 className="text-lg font-bold text-zinc-900">Branding & Links</h2>
                            </div>

                            <div className="space-y-8">
                                <Input
                                    label="Google Review Link"
                                    id="googleReviewLink"
                                    placeholder="https://g.page/r/..."
                                    required
                                    value={formData.googleReviewLink}
                                    onChange={handleChange}
                                    readOnly={isViewOnly}
                                    className={`mb-0 ${isViewOnly ? 'opacity-75 cursor-default' : ''}`}
                                />

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-xs font-bold text-zinc-700 mb-2 ml-1">Primary Color</label>
                                        <div className="flex items-center gap-3">
                                            <input
                                                type="color"
                                                id="primaryColor"
                                                value={formData.primaryColor}
                                                onChange={handleChange}
                                                disabled={isViewOnly}
                                                className={`w-10 h-10 rounded-lg cursor-pointer border-none p-0 overflow-hidden shadow-sm ${isViewOnly ? 'pointer-events-none' : ''}`}
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-zinc-700 mb-2 ml-1">Secondary Color</label>
                                        <div className="flex items-center gap-3">
                                            <input
                                                type="color"
                                                id="secondaryColor"
                                                value={formData.secondaryColor}
                                                onChange={handleChange}
                                                disabled={isViewOnly}
                                                className={`w-10 h-10 rounded-lg cursor-pointer border-none p-0 overflow-hidden shadow-sm ${isViewOnly ? 'pointer-events-none' : ''}`}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* DESKTOP ONLY Buttons (Hidden on mobile) */}
                        {!isViewOnly && (
                            <div className="hidden md:flex justify-end pt-4 gap-3">
                                <Button
                                    variant="secondary"
                                    onClick={() => setIsViewOnly(true)}
                                    size="md"
                                    className="px-8 h-12 text-sm"
                                    disabled={loading}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    size="md"
                                    type="submit"
                                    className="px-8 h-12 shadow-lg shadow-primary-500/10 text-sm"
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Saving...
                                        </>
                                    ) : (isEdit ? 'Save Changes' : 'Create Profile')}
                                </Button>
                            </div>
                        )}
                    </form>
                </Card>
            </div>

            {/* --- 1. MOBILE EDIT BUTTON (Circular FAB) --- */}
            {isViewOnly && (
                <div
                    className="
    fixed 
    bottom-4 right-4 
    sm:bottom-5 sm:right-5
    z-50 
    md:hidden
    animate-in fade-in zoom-in duration-300
    safe-bottom safe-right
  "
                >
                    <Button
                        size="icon"
                        onClick={() => setIsViewOnly(false)}
                        className="
                        h-11 w-11
                        sm:h-12 sm:w-12
                        rounded-full
                        bg-zinc-900 text-white
                        shadow-2xl shadow-zinc-900/40
                        transition-all
                        hover:scale-105 active:scale-95
                        flex items-center justify-center
                        "
                    >
                        <UserPen className="h-5 w-5 sm:h-6 sm:w-6" />
                    </Button>
                </div>
            )}

            {/* --- 2. MOBILE ACTION BAR (Cancel / Save) --- */}
            {!isViewOnly && (
                <div className="fixed bottom-0 left-0 right-0 px-4 py-4 backdrop-blur-md border-t border-zinc-200 z-50 md:hidden flex items-center gap-3 animate-slide-up">
                    <Button
                        size="icon"
                        variant="secondary"
                        onClick={() => setIsViewOnly(true)}
                        className="flex-1 h-12 rounded-pill bg-zinc-100 text-zinc-900 font-bold shadow-xs border border-zinc-200"
                        disabled={loading}
                    >
                        <X size={18} className="mr-2" />
                        Cancel
                    </Button>

                    <Button
                        size="icon"
                        type="submit"
                        form="settings-form"
                        className="flex-1 h-12 rounded-pill shadow-xl shadow-primary-500/20 font-bold"
                        disabled={loading}
                    >
                        {loading ? (
                            <Loader2 className="animate-spin" />
                        ) : (
                            <>
                                <Check size={18} className="mr-2" />
                                Save
                            </>
                        )}
                    </Button>
                </div>
            )}

        </>
    );
};

export default CreateBusiness;
