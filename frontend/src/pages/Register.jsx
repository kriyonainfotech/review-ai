import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Check, AlertCircle, Sparkles, Loader2, Upload, Eye, EyeOff } from 'lucide-react';
import { api } from '../api';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';

const Register = () => {
    const navigate = useNavigate();

    // Steps: 1=Email/OTP, 2=Slug, 3=Business, 4=Password
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    // Auth State
    const [otpSent, setOtpSent] = useState(false);

    // Data State
    const [slugStatus, setSlugStatus] = useState({ state: 'idle', message: '' });
    const [logoPreview, setLogoPreview] = useState(null);
    const [formData, setFormData] = useState({
        email: '',
        otp: '',
        username: '', // slug
        businessName: '',
        phoneNumber: '',
        services: '',
        googleReviewLink: '',
        password: '',
        logo: null
    });

    // Auto-generate username from email when reaching step 2
    useEffect(() => {
        if (step === 2 && !formData.username && formData.email) {
            const defaultUsername = formData.email.split('@')[0].replace(/[^a-zA-Z0-9._]/g, '');
            setFormData(prev => ({ ...prev, username: defaultUsername }));
            validateSlug(defaultUsername);
        }
    }, [step]);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
        setError('');
        if (id === 'username') validateSlug(value);
    };

    const handleSendOTP = async () => {
        if (!formData.email) return setError('Please enter your email');
        if (!formData.password) return setError('Please create a password');
        if (formData.password.length < 6) return setError('Password must be at least 6 characters');

        setLoading(true);
        setError('');
        try {
            await api.sendOTP(formData.email);
            setOtpSent(true);
        } catch (err) {
            setError(err.message || 'Failed to send OTP');
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyAndRegisterUser = async () => {
        if (!formData.otp) return setError('Please enter the OTP');
        setLoading(true);
        setError('');

        try {
            // 1. Verify OTP first
            await api.verifyOTP(formData.email, formData.otp);

            // 2. CREATE USER immediately after verification
            try {
                const userResp = await api.register({
                    email: formData.email,
                    password: formData.password,
                    name: formData.email.split('@')[0] || 'User',
                    phoneNumber: formData.phoneNumber || ''
                });

                // Store token so we are authenticated for subsequent steps
                localStorage.setItem('token', userResp.token);
                localStorage.setItem('user', JSON.stringify(userResp));

                // Proceed to Business Setup
                setStep(2);
            } catch (regErr) {
                // If register fails because "User already exists", we should probably redirect to login
                // or just proceed if the token is somehow available (unlikely without login)
                if (regErr.message && regErr.message.includes('exists')) {
                    setError('Account already exists. Please Log In.');
                    setTimeout(() => navigate('/login'), 2000);
                } else {
                    throw regErr;
                }
            }
        } catch (err) {
            setError(err.message || 'Verification failed');
        } finally {
            setLoading(false);
        }
    };

    const validateSlug = async (slug) => {
        if (!slug) {
            setSlugStatus({ state: 'idle', message: '' });
            return;
        }
        const regex = /^[a-zA-Z0-9._]+$/;
        if (!regex.test(slug)) {
            setSlugStatus({ state: 'invalid', message: 'Allowed: letters, numbers, dot(.), underscore(_)' });
            return;
        }

        setSlugStatus({ state: 'loading', message: 'Checking availability...' });
        try {
            const response = await api.checkSlug(slug);
            if (response.available) {
                setSlugStatus({ state: 'available', message: 'Available' });
            } else {
                setSlugStatus({ state: 'taken', message: 'Username already taken' });
            }
        } catch (err) {
            setSlugStatus({ state: 'available', message: 'Available' });
        }
    };

    const handleCreateBusiness = async () => {
        setLoading(true);
        setError('');

        try {
            // Create Business
            const bData = new FormData();
            bData.append('slug', formData.username);
            bData.append('businessName', formData.businessName);
            bData.append('googleReviewLink', formData.googleReviewLink);
            bData.append('businessServices', formData.services);
            bData.append('businessId', formData.username);
            if (formData.logo) bData.append('logo', formData.logo);

            await api.createBusiness(bData);

            // If user added a password in the final step, we should update their profile
            // Note: This requires an endpoint like updateProfile, skipping for now based on snippet

            navigate('/registration-success', { state: { username: formData.username } });
        } catch (err) {
            console.error(err);
            setError(err.message || 'Registration failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleNextStep = () => {
        setError('');
        if (step === 2) {
            if (slugStatus.state !== 'available') return setError('Please choose a valid username');
            setStep(3);
        }
    };

    const renderHeader = () => {
        switch (step) {
            case 1: return { title: 'Create Account', sub: otpSent ? 'Check your email for the code' : 'Join RevLinko and grow your reputation.' };
            case 2: return { title: 'Claim Username', sub: 'Choose your unique RevLinko URL.' };
            case 3: return { title: 'Business Details', sub: 'Tell us about your business.' };
            default: return { title: 'RevLinko', sub: '' };
        }
    };

    const { title, sub } = renderHeader();

    return (
        <div className="flex min-h-screen w-full flex-col lg:flex-row bg-white font-sans overflow-hidden relative">
            {/* Left Side Branding (Green theme for Register) */}
            <div className="relative hidden w-1/2 flex-col justify-between overflow-hidden lg:flex transition-all duration-700 bg-emerald-600"
                style={step < 3 ? { background: 'linear-gradient(135deg, #2463eb 0%, #38bdf8 100%)' } : { background: 'linear-gradient(135deg, #059669 0%, #10b981 100%)' }}>
                <div className="absolute inset-0 opacity-20 pointer-events-none">
                    <svg height="100%" width="100%"><defs><pattern height="40" id="grid-reg" patternUnits="userSpaceOnUse" width="40"><path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1"></path></pattern></defs><rect fill="url(#grid-reg)" height="100%" width="100%"></rect></svg>
                </div>
                <div className="z-10 px-10 py-8">
                    <Link to="/" className="flex items-center gap-2.5 text-white">
                        <div className="size-9 flex items-center justify-center rounded-lg bg-white text-primary-600 shadow-lg">
                            <Sparkles size={20} fill="currentColor" />
                        </div>
                        <h2 className="text-xl font-bold tracking-tight">RevLinko</h2>
                    </Link>
                </div>
                <div className="z-10 px-10 py-16">
                    <h1 className="text-white text-4xl font-bold leading-tight tracking-tight max-w-sm">
                        {step === 3 ? 'Almost Done!' : 'Start Growing Your Reputation'}
                    </h1>
                    <p className="text-white/80 text-base mt-4 max-w-xs">AI-powered review generation for modern businesses.</p>
                </div>
                <div className="z-10 px-10 py-8 text-white/60 text-xs">© {new Date().getFullYear()} RevLinko Inc.</div>
            </div>

            {/* Right Side Form */}
            <div className="flex flex-1 flex-col p-6 lg:items-center lg:justify-center lg:p-12 relative z-10 bg-white">
                {/* Mobile Header: Logo at top left/start */}
                <div className="lg:hidden w-full flex justify-start pt-4 pb-12">
                    <Link to="/" className="flex items-center gap-2 group">
                        <div className="size-10 flex items-center justify-center text-primary-600 bg-primary-50 rounded-xl">
                            <Sparkles size={24} fill="currentColor" />
                        </div>
                        <span className="text-xl font-black tracking-tight text-slate-900">RevLinko</span>
                    </Link>
                </div>

                {/* Form Container */}
                <div className="w-full max-w-[440px] mx-auto lg:bg-white lg:p-12 lg:rounded-[32px] lg:shadow-2xl lg:shadow-slate-200/50 lg:border lg:border-slate-100 animate-in fade-in zoom-in duration-500">
                    <div className="mb-10 text-center lg:text-left">
                        <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-3">{title}</h2>
                        <p className="text-slate-500 font-medium">{sub}</p>
                    </div>

                    {error && (
                        <div className="mb-6 p-3 bg-red-50 text-red-600 text-xs font-bold rounded-xl flex items-center gap-2 animate-pulse">
                            <AlertCircle size={16} />
                            {error}
                        </div>
                    )}

                    {/* Step 1: Email & OTP */}
                    {step === 1 && (
                        <div className="space-y-4">
                            <Input
                                label="Email Address"
                                id="email"
                                type="email"
                                required
                                leftIcon={Mail}
                                placeholder="alex@example.com"
                                value={formData.email}
                                onChange={handleChange}
                                disabled={otpSent}
                            />

                            <Input
                                label="Create Password"
                                id="password"
                                type={showPassword ? 'text' : 'password'}
                                leftIcon={Lock}
                                placeholder="••••••••"
                                value={formData.password}
                                onChange={handleChange}
                                disabled={otpSent}
                                rightIcon={
                                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="text-slate-400 hover:text-primary-600 transition-colors">
                                        <span className="material-symbols-outlined text-[18px]">{showPassword ? 'Hide' : 'Show'}</span>
                                    </button>
                                }
                            />

                            {otpSent && (
                                <Input
                                    label="One-Time Password"
                                    id="otp"
                                    type="text"
                                    required
                                    leftIcon={Lock}
                                    placeholder="Enter code from email"
                                    value={formData.otp}
                                    onChange={handleChange}
                                />
                            )}

                            <Button
                                onClick={otpSent ? handleVerifyAndRegisterUser : handleSendOTP}
                                loading={loading}
                                fullWidth
                                size="lg"
                                className={`h-12 text-base transition-all duration-300 ${(otpSent ? !formData.otp : (!formData.email || !formData.password))
                                    ? 'bg-slate-100 text-slate-400 border-slate-100 shadow-none'
                                    : 'shadow-lg shadow-primary-500/20'
                                    }`}
                                variant={(otpSent ? !formData.otp : (!formData.email || !formData.password)) ? 'secondary' : 'primary'}
                            >
                                {otpSent ? 'Verify & Continue' : 'Send Verification Code'}
                            </Button>

                            {otpSent && (
                                <button onClick={handleSendOTP} className="w-full text-xs font-bold text-slate-400 hover:text-primary-600">
                                    Resend Code
                                </button>
                            )}
                        </div>
                    )}

                    {/* Step 2: Slug */}
                    {step === 2 && (
                        <div className="space-y-5">
                            <div className="space-y-1.5">
                                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider ml-1">Choose Username</label>
                                <div className="flex h-11 px-3.5 bg-slate-50 border border-slate-200 rounded-xl items-center gap-1 focus-within:ring-4 focus-within:ring-primary-600/10 focus-within:border-primary-600 transition-all">
                                    <span className="text-slate-400 font-medium text-sm">revlinko.com/</span>
                                    <input
                                        id="username" type="text"
                                        className="flex-1 bg-transparent outline-none font-bold text-slate-900 text-sm"
                                        placeholder="username"
                                        value={formData.username} onChange={handleChange}
                                    />
                                    {slugStatus.state === 'loading' && <Loader2 className="animate-spin text-primary-600" size={16} />}
                                    {slugStatus.state === 'available' && <Check className="text-emerald-500" size={16} />}
                                    {(slugStatus.state === 'taken' || slugStatus.state === 'invalid') && <AlertCircle className="text-red-500" size={16} />}
                                </div>
                                <div className="px-1 flex justify-between items-center text-[10px] font-bold uppercase tracking-tight">
                                    <span className={slugStatus.state === 'available' ? 'text-emerald-600' : (slugStatus.state === 'taken' || slugStatus.state === 'invalid') ? 'text-red-500' : 'text-slate-400'}>
                                        {slugStatus.message || 'Allowed: a–z, 0–9, . , _'}
                                    </span>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                {/* Back button disabled because user is already created at Step 2 */}
                                {/* We don't want them to go back and re-register */}
                                <Button variant="secondary" disabled size="lg">Back</Button>
                                <Button
                                    onClick={handleNextStep}
                                    disabled={slugStatus.state !== 'available'}
                                    size="lg"
                                    className={`transition-all duration-300 ${slugStatus.state !== 'available'
                                        ? 'bg-slate-100 text-slate-400 border-slate-100 shadow-none'
                                        : 'shadow-lg shadow-primary-500/20'
                                        }`}
                                    variant={slugStatus.state !== 'available' ? 'secondary' : 'primary'}
                                >
                                    Continue
                                </Button>
                            </div>
                        </div>
                    )}

                    {/* Step 3: Business Info */}
                    {step === 3 && (
                        <div className="space-y-4">
                            <div className="flex justify-center mb-1">
                                <label className="relative cursor-pointer group">
                                    <div className="size-20 rounded-xl bg-slate-50 border-2 border-dashed border-slate-200 flex flex-col items-center justify-center overflow-hidden group-hover:border-primary-600 transition-colors">
                                        {logoPreview ? (
                                            <img src={logoPreview} className="size-full object-cover" alt="Logo preview" />
                                        ) : (
                                            <>
                                                <Upload size={18} className="text-slate-400 mb-1" />
                                                <span className="text-[9px] font-bold text-slate-500 uppercase">Logo</span>
                                            </>
                                        )}
                                    </div>
                                    <input type="file" className="hidden" accept="image/*" onChange={(e) => {
                                        const file = e.target.files[0];
                                        if (file) {
                                            setFormData(prev => ({ ...prev, logo: file }));
                                            setLogoPreview(URL.createObjectURL(file));
                                        }
                                    }} />
                                </label>
                            </div>

                            <Input id="businessName" label="Business Name" placeholder="e.g. Acme Corp" required value={formData.businessName} onChange={handleChange} />
                            <Input id="googleReviewLink" label="Google Review Link" placeholder="https://g.page/r/..." required value={formData.googleReviewLink} onChange={handleChange} />

                            <div className="space-y-1.5 text-left">
                                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider ml-1">Services Offered</label>
                                <textarea
                                    id="services"
                                    placeholder="e.g. Web Design, SEO, Hosting"
                                    className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl outline-none resize-none h-20 text-sm font-medium focus:ring-4 focus:ring-primary-600/10 focus:border-primary-600"
                                    value={formData.services}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="bg-emerald-50 p-3 rounded-xl flex gap-2 items-start">
                                <Check size={16} className="text-emerald-600 mt-0.5" />
                                <p className="text-xs text-emerald-800 font-medium">Your business profile <strong>{formData.businessName}</strong> is ready to be created.</p>
                            </div>

                            <div className="grid grid-cols-2 gap-3 pt-1">
                                <Button variant="secondary" onClick={() => setStep(2)} size="lg">Back</Button>
                                <Button
                                    onClick={handleCreateBusiness}
                                    loading={loading}
                                    size="lg"
                                    className={`transition-all duration-300 ${(!formData.businessName || !formData.googleReviewLink)
                                        ? 'bg-slate-100 text-slate-400 border-slate-100 shadow-none'
                                        : 'shadow-lg shadow-emerald-500/20'
                                        }`}
                                    variant={(!formData.businessName || !formData.googleReviewLink) ? 'secondary' : 'primary'}
                                >
                                    Finish Setup
                                </Button>
                            </div>
                        </div>
                    )}

                    <div className="mt-8 text-center pt-6 border-t border-slate-50">
                        <p className="text-slate-500 text-[13px] font-medium">
                            Already have an account?
                            <Link className="text-primary-600 font-bold hover:underline ml-1" to="/login">Log in here</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;