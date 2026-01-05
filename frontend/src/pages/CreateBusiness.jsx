import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import {
    Building2,
    ChevronRight,
    Loader2, Sparkles
} from 'lucide-react';
import { api } from '../api';

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
    const [businessId_db, setBusinessId_db] = useState(null);

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.get('edit') === 'true') {
            setIsEdit(true);
            fetchBusinessData();
        }
    }, []);

    const fetchBusinessData = async () => {
        try {
            const data = await api.getMyBusiness();
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
        } catch (err) {
            setError('Failed to fetch business data for editing.');
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
                data.append('logo', logo);
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
        <div className="p-8 lg:p-12 max-w-4xl mx-auto animate-fade-in-up">
            <header className="mb-10">
                <div className="flex items-center gap-2 text-sm font-bold text-zinc-400 uppercase tracking-widest mb-4">
                    <span>Dashboard</span>
                    <ChevronRight size={14} />
                    <span className="text-primary-600">{isEdit ? 'Edit Profile' : 'Create Profile'}</span>
                </div>
                <h1 className="text-4xl font-extrabold text-zinc-900 tracking-tight mb-3">
                    {isEdit ? 'Update your Business Profile' : 'Create your Business Profile'}
                </h1>
                <p className="text-zinc-500 font-medium text-lg">Let's set up your AI-powered review page to start gathering feedback.</p>

                <div className="flex gap-2 mt-8">
                    <div className="h-1.5 flex-1 bg-primary-600 rounded-full shadow-sm shadow-primary-500/20"></div>
                    <div className="h-1.5 flex-1 bg-primary-600 rounded-full shadow-sm shadow-primary-500/20"></div>
                    <div className="h-1.5 flex-1 bg-primary-600 rounded-full shadow-sm shadow-primary-500/20"></div>
                </div>
            </header>

            {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 text-sm font-bold rounded-xl flex items-center gap-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                    {error}
                </div>
            )}

            <Card className="p-10 border-zinc-100 shadow-xl">
                <form onSubmit={handleSubmit} className="space-y-10" encType="multipart/form-data">
                    <section>
                        <div className="flex items-center gap-3 mb-8">
                            <div className="w-10 h-10 bg-primary-50 text-primary-600 rounded-xl flex items-center justify-center">
                                <Building2 size={22} />
                            </div>
                            <h2 className="text-xl font-bold text-zinc-900">Business Identity</h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <Input
                                label="Business ID"
                                id="businessId"
                                placeholder="unique-business-id"
                                required
                                value={formData.businessId}
                                onChange={handleChange}
                                className="mb-0"
                            />
                            <Input
                                label="Business Name"
                                id="businessName"
                                placeholder="e.g. Acme Coffee Roasters"
                                required
                                value={formData.businessName}
                                onChange={handleChange}
                                className="mb-0"
                            />
                        </div>

                        <div className="space-y-6">
                            <div>
                                <label htmlFor="businessDescription" className="block text-sm font-bold text-zinc-700 mb-2 ml-1">About the Business</label>
                                <textarea
                                    id="businessDescription"
                                    placeholder="e.g., We are a family-owned Italian restaurant..."
                                    value={formData.businessDescription}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-2xl border border-zinc-200 bg-white text-zinc-900 text-[15px] transition-all duration-200 outline-hidden focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 min-h-[100px] resize-none"
                                />
                            </div>

                            <Input
                                label="Services (Comma separated)"
                                id="businessServices"
                                placeholder="e.g., Pizza, Pasta, Catering, Delivery"
                                value={formData.businessServices}
                                onChange={handleChange}
                                className="mb-0"
                            />
                        </div>
                    </section>

                    <section className="pt-10 border-t border-zinc-100">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="w-10 h-10 bg-primary-50 text-primary-600 rounded-xl flex items-center justify-center">
                                <Sparkles size={22} />
                            </div>
                            <h2 className="text-xl font-bold text-zinc-900">Branding & Links</h2>
                        </div>

                        <div className="space-y-10">
                            <div>
                                <label className="block text-sm font-bold text-zinc-700 mb-4 ml-1">Business Logo</label>
                                <div className="flex items-center gap-6">
                                    <div className="w-24 h-24 bg-zinc-50 border-2 border-dashed border-zinc-200 rounded-3xl flex items-center justify-center overflow-hidden shrink-0">
                                        {logoPreview ? (
                                            <img src={logoPreview} alt="Preview" className="w-full h-full object-cover" />
                                        ) : (
                                            <Building2 size={32} className="text-zinc-300" />
                                        )}
                                    </div>
                                    <div className="flex-1">
                                        <input
                                            type="file"
                                            id="logo"
                                            accept="image/*"
                                            onChange={handleFileChange}
                                            className="hidden"
                                        />
                                        <label
                                            htmlFor="logo"
                                            className="inline-flex items-center px-4 py-2.5 bg-white border border-zinc-200 rounded-xl text-sm font-bold text-zinc-700 cursor-pointer hover:bg-zinc-50 transition-colors shadow-sm"
                                        >
                                            Change Logo
                                        </label>
                                        <p className="text-zinc-400 text-xs mt-2 font-medium italic">PNG, JPG or WebP. Max 5MB.</p>
                                    </div>
                                </div>
                            </div>

                            <Input
                                label="Google Review Link"
                                id="googleReviewLink"
                                placeholder="https://g.page/r/..."
                                required
                                value={formData.googleReviewLink}
                                onChange={handleChange}
                                className="mb-0"
                            />

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div>
                                    <label className="block text-sm font-bold text-zinc-700 mb-3 ml-1">Primary Color (Buttons)</label>
                                    <div className="flex items-center gap-4">
                                        <input
                                            type="color"
                                            id="primaryColor"
                                            value={formData.primaryColor}
                                            onChange={handleChange}
                                            className="w-14 h-14 rounded-xl cursor-pointer border-none p-0 overflow-hidden"
                                        />
                                        <span className="text-sm font-mono font-bold text-zinc-500 uppercase">{formData.primaryColor}</span>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-zinc-700 mb-3 ml-1">Secondary Color (Text)</label>
                                    <div className="flex items-center gap-4">
                                        <input
                                            type="color"
                                            id="secondaryColor"
                                            value={formData.secondaryColor}
                                            onChange={handleChange}
                                            className="w-14 h-14 rounded-xl cursor-pointer border-none p-0 overflow-hidden"
                                        />
                                        <span className="text-sm font-mono font-bold text-zinc-500 uppercase">{formData.secondaryColor}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <div className="flex justify-end pt-6">
                        <Button
                            size="lg"
                            type="submit"
                            className="px-12 h-14 shadow-xl shadow-primary-500/10"
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                    {isEdit ? 'Updating...' : 'Creating...'}
                                </>
                            ) : (isEdit ? 'Update Profile' : 'Create Profile')}
                        </Button>
                    </div>
                </form>
            </Card>
        </div>
    );
};

export default CreateBusiness;
