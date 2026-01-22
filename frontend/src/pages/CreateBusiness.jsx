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

            setIsViewOnly(true);
            setIsEdit(true);
            fetchBusinessData(); // Refresh data to get current state from DB
        } catch (err) {
            setError(err.message || 'Failed to save business profile.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {/* --- Main Content --- */}
            <div className="p-0 md:p-6 pb-28 md:pb-6 animate-fade-in-up md:bg-zinc-50/30">
                <header className="mb-4 md:mb-8 flex items-center justify-between gap-4 px-4 md:px-1 pt-4 md:pt-0">
                    <div className="space-y-0.5 min-w-0">
                        <div className="flex items-center gap-2 text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
                            <span>Dash</span>
                            <ChevronRight size={10} />
                            <span className="text-primary-600">
                                {isViewOnly ? 'Profile' : (isEdit ? 'Settings' : 'New')}
                            </span>
                        </div>
                        <h1 className="text-xl md:text-3xl font-black text-zinc-900 tracking-tight truncate">
                            {isViewOnly ? 'Profile' : (isEdit ? 'Settings' : 'Create')}
                        </h1>
                    </div>

                    {isViewOnly && (
                        <Button
                            onClick={() => setIsViewOnly(false)}
                            className="h-9 md:h-10 rounded-xl bg-zinc-900 text-white hover:bg-zinc-800 flex items-center gap-2 px-4 shadow-sm-premium"
                            size="sm"
                        >
                            <UserPen size={15} />
                            <span className="text-xs font-bold">Edit</span>
                        </Button>
                    )}
                </header>

                {error && (
                    <div className="mb-4 p-3 bg-red-50 border border-red-100 text-red-600 text-[13px] font-bold rounded-xl flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
                        {error}
                    </div>
                )}

                <Card className="p-0 overflow-hidden bg-transparent">
                    {/* IMPORTANT: Added ID to form to connect external buttons */}
                    <form id="settings-form" onSubmit={handleSubmit} className="space-y-8" encType="multipart/form-data">

                        {/* ... (Keep ALL your existing Inputs/Sections exactly the same) ... */}
                        <section className="mb-0 px-4 py-6 md:p-0 md:bg-transparent">
                            {!isViewOnly && (
                                <div className="hidden md:flex items-center gap-3 mb-8">
                                    <div className="w-10 h-10 bg-primary-50 text-primary-600 rounded-xl flex items-center justify-center shadow-sm-premium">
                                        <Building2 size={20} />
                                    </div>
                                    <h2 className="text-xl font-black text-zinc-900 tracking-tight">Business Identity</h2>
                                </div>
                            )}

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
                                        className={`w-full px-3 py-2.5 rounded-xl border border-zinc-200 bg-white text-zinc-900 text-base md:text-[14px] transition-all duration-200 outline-hidden focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 min-h-[100px] resize-none ${isViewOnly ? 'opacity-75 cursor-default' : ''}`}
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

                        <section className="px-4 py-6 md:p-0 md:pt-8 border-t border-zinc-100 md:bg-zinc-50/30">
                            {!isViewOnly && (
                                <div className="hidden md:flex items-center gap-3 mb-8">
                                    <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center shadow-sm-premium">
                                        <Sparkles size={20} />
                                    </div>
                                    <h2 className="text-xl font-black text-zinc-900 tracking-tight">Branding & Links</h2>
                                </div>
                            )}

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

                                <div className="grid grid-cols-2 gap-6 my-6">
                                    <Input
                                        label="Primary Color"
                                        id="primaryColor"
                                        type="color"
                                        value={formData.primaryColor}
                                        onChange={handleChange}
                                        readOnly={isViewOnly}
                                        className={`h-12 p-1 rounded-xl ${isViewOnly ? 'opacity-75 cursor-default' : ''
                                            }`}
                                    />

                                    <Input
                                        label="Secondary Color"
                                        id="secondaryColor"
                                        type="color"
                                        value={formData.secondaryColor}
                                        onChange={handleChange}
                                        readOnly={isViewOnly}
                                        className={`h-12 p-1 rounded-xl ${isViewOnly ? 'opacity-75 cursor-default' : ''
                                            }`}
                                    />
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

            {/* --- 1. MOBILE EDIT BUTTON REMOVED IN FAVOR OF HEADER BUTTON --- */}

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
