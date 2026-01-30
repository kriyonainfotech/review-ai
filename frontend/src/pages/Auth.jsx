import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Lock, Rocket, Mail, Github, Loader2, Sparkles, User, Check, AlertCircle, Upload, Palette, ArrowRight, Share2, LayoutDashboard, Globe } from 'lucide-react';
import { api } from '../api';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import RevLinkoLogo from '../components/ui/RevLinkoLogo';

const Auth = ({ isLogin }) => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    // Registration State
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        otp: '',
        password: '',
        username: '',
        businessName: '',
        phoneNumber: '',
        services: '',
        googleReviewLink: '',
        primaryColor: '#2463eb',
        logo: null
    });

    const [otpSent, setOtpSent] = useState(false);
    const [loginMode, setLoginMode] = useState('otp'); // Default to 'otp'
    const [slugStatus, setSlugStatus] = useState({ state: 'idle', message: '' });
    const [logoPreview, setLogoPreview] = useState(null);

    // Sync username from business name on step 3 change or step 2 open
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

        if (id === 'username') {
            validateSlug(value);
        }
    };

    const handleSendOTP = async () => {
        if (!formData.email) {
            setError('Please enter your email');
            return;
        }
        setLoading(true);
        try {
            await api.sendOTP(formData.email);
            setOtpSent(true);
            setSuccessMessage('OTP sent to your email');
            setTimeout(() => setSuccessMessage(''), 3000);
        } catch (err) {
            setError(err.message || 'Failed to send OTP');
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyOTP = async () => {
        if (!formData.otp) {
            setError('Please enter the OTP');
            return;
        }
        setLoading(true);
        try {
            await api.verifyOTP(formData.email, formData.otp);
            setStep(2); // Move to slug setup
            setError('');
        } catch (err) {
            setError(err.message || 'Invalid or expired OTP');
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
            setSlugStatus({ state: 'invalid', message: 'Use only letters, numbers, dots(.), and underscores(_)' });
            return;
        }
        setSlugStatus({ state: 'loading', message: '' });
        try {
            const response = await api.checkSlug(slug);
            if (response.available) {
                setSlugStatus({ state: 'available', message: 'Available' });
            } else {
                setSlugStatus({ state: 'taken', message: 'Username already taken' });
            }
        } catch (err) {
            setSlugStatus({ state: 'idle', message: 'Could not verify username' });
        }
    };

    const handleNextStep = () => {
        if (step === 2) { // Slug to Business Info
            if (slugStatus.state !== 'available') {
                setError('Please choose a valid and available username');
                return;
            }
            setStep(3);
        } else if (step === 3) { // Business Info to Password
            if (!formData.businessName || !formData.googleReviewLink) {
                setError('Please fill required business details');
                return;
            }
            setStep(4);
        } else if (step === 4) { // Password to Register
            handleRegister();
        }
        setError('');
    }; const handleRegister = async (e) => {
        if (e) e.preventDefault();
        setLoading(true);
        setError('');

        try {
            // Register user
            const userResp = await api.register({
                email: formData.email,
                name: formData.name || formData.businessName,
                password: formData.password,
                phoneNumber: formData.phoneNumber
            });

            localStorage.setItem('token', userResp.token);
            localStorage.setItem('user', JSON.stringify(userResp));

            // Create business
            const bData = new FormData();
            bData.append('slug', formData.username);
            bData.append('businessName', formData.businessName);
            bData.append('googleReviewLink', formData.googleReviewLink);
            bData.append('businessServices', formData.services);
            bData.append('businessId', formData.username);
            if (formData.logo) bData.append('logo', formData.logo);

            await api.createBusiness(bData);

            // Successfully registered and business created
            navigate('/registration-success', { state: { username: formData.username } });
        } catch (err) {
            setError(err.message || 'Registration failed.');
            setLoading(false);
        }
    };


    const handleLogin = async (e) => {
        e.preventDefault();
        if (loginMode === 'otp' && !otpSent) {
            handleSendOTP();
            return;
        }

        setLoading(true);
        setError('');

        try {
            const credentials = { email: formData.email };
            if (loginMode === 'password') credentials.password = formData.password;
            else credentials.otp = formData.otp;

            const data = await api.login(credentials);
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data));

            // Intelligent Redirect: Check if business exists
            try {
                await api.getMyBusiness();
                navigate('/dashboard');
            } catch (bizErr) {
                navigate('/create-business');
            }
        } catch (err) {
            setError(err.message || 'Login failed.');
        } finally {
            setLoading(false);
        }
    };

    const renderHeader = () => {
        if (isLogin) return { title: 'Welcome Back', sub: loginMode === 'password' ? 'Sign in with your password' : 'Sign in with email OTP' };
        if (step === 1) return {
            title: 'Create Your Account',
            sub: otpSent ? 'Enter the code we sent to your email' : 'Join RevLinko and grow your reputation.'
        };
        if (step === 2) return { title: 'Claim Username', sub: 'This will be your unique URL.' };
        if (step === 3) return { title: 'Business Details', sub: 'Tell us about your business.' };
        if (step === 4) return { title: 'Set Password', sub: 'Secure your account (optional).' };
        return { title: 'RevLinko', sub: '' };
    };

    const { title, sub } = renderHeader();

    return (
        <div className="flex min-h-screen w-full flex-col lg:flex-row bg-slate-50 font-sans overflow-hidden relative">
            {/* --- MOBILE BACKGROUND (Visible only on small screens) --- */}
            <div className="absolute inset-0 lg:hidden opacity-40 pointer-events-none">
                <div className="absolute inset-0" style={{ background: 'radial-gradient(circle at 50% 50%, #f1f5f9 0%, #f8fafc 100%)' }}></div>
                <svg height="100%" width="100%">
                    <defs>
                        <pattern height="30" id="grid-mobile" patternUnits="userSpaceOnUse" width="30">
                            <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#2563eb" strokeWidth="0.5" strokeOpacity="0.05"></path>
                        </pattern>
                    </defs>
                    <rect fill="url(#grid-mobile)" height="100%" width="100%"></rect>
                </svg>
            </div>

            {/* --- LEFT SIDE: Branding (Desktop Only) --- */}
            <div className={`relative hidden w-1/2 flex-col justify-between overflow-hidden lg:flex transition-all duration-700 ${step === 4 ? 'bg-emerald-600' : 'bg-primary-600'}`}
                style={step !== 4 ? { background: 'linear-gradient(135deg, #0A8DDB 0%, #38bdf8 100%)' } : { background: 'linear-gradient(135deg, #059669 0%, #10b981 100%)' }}>
                <div className="absolute inset-0 opacity-20 pointer-events-none">
                    <svg height="100%" width="100%">
                        <defs>
                            <pattern height="40" id="grid-desktop" patternUnits="userSpaceOnUse" width="40">
                                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1"></path>
                            </pattern>
                        </defs>
                        <rect fill="url(#grid-desktop)" height="100%" width="100%"></rect>
                    </svg>
                </div>

                <div className="z-10 px-10 py-8">
                    <Link to="/" className="flex items-center gap-2.5 text-white">
                        <div className="size-9 flex items-center justify-center rounded-lg bg-white text-primary-600 shadow-lg">
                            <RevLinkoLogo size={20} />
                        </div>
                        <h2 className="text-xl font-bold tracking-tight">RevLinko</h2>
                    </Link>
                </div>

                <div className="z-10 px-10 py-16">
                    <h1 className="text-white text-4xl font-bold leading-tight tracking-tight max-w-sm">
                        {isLogin ? 'Turn Customers Into Advocates' : step === 4 ? 'Success! Welcome Aboard' : 'Start Growing Your Reputation Today'}
                    </h1>
                    <p className="text-white/80 text-base mt-4 max-w-xs">
                        Harness the power of AI to generate authentic Google Reviews and scale your business reputation effortlessly.
                    </p>
                </div>

                <div className="z-10 px-10 py-8 text-white/60 text-xs">
                    © {new Date().getFullYear()} RevLinko Inc.
                </div>
            </div>

            {/* --- MOBILE LOGO (Visible only on small screens) --- */}
            <div className="lg:hidden mb-8 lg:mb-0 transition-opacity">
                <Link to="/" className="flex items-center gap-2 group">
                    <div className="size-12 flex items-center justify-center text-primary-600 border border-slate-100 group-hover:scale-105 transition-transform duration-300">
                        <RevLinkoLogo size={28} />
                    </div>
                    <span className="text-xl font-black tracking-tight text-slate-900">RevLinko</span>
                </Link>
            </div>

            {/* --- RIGHT SIDE: Form --- */}
            <div className="flex flex-1 flex-col items-center justify-center p-4 lg:p-6 relative z-10">
                <div className="w-full max-w-[420px] bg-white rounded-[24px] p-6 lg:p-8 shadow-xl border border-slate-100 animate-in fade-in zoom-in duration-500">
                    <div className="mb-8 text-center sm:text-left">
                        <h2 className="text-2xl font-bold text-slate-900 tracking-tight mb-2">{title}</h2>
                        <p className="text-slate-500 text-sm font-medium">{sub}</p>
                    </div>

                    {error && (
                        <div className="mb-6 p-4 bg-red-50 text-red-600 text-sm font-bold rounded-2xl flex items-center gap-3 animate-pulse">
                            <AlertCircle size={18} />
                            {error}
                        </div>
                    )}

                    {successMessage && (
                        <div className="mb-6 p-4 bg-emerald-50 text-emerald-600 text-sm font-bold rounded-2xl flex items-center gap-3">
                            <Check size={18} />
                            {successMessage}
                        </div>
                    )}

                    {/* --- LOGIN FORM --- */}
                    {isLogin && (
                        <form className="space-y-4" onSubmit={handleLogin}>

                            <Input
                                label="Email Address"
                                id="email"
                                type="email"
                                required
                                leftIcon={Mail}
                                placeholder="name@company.com"
                                value={formData.email}
                                onChange={handleChange}
                            />

                            {loginMode === 'password' ? (
                                <div className="space-y-1.5">
                                    <div className="flex justify-between items-center px-1">
                                        <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Password</label>
                                        <Link className="text-primary-600 text-[11px] font-bold hover:underline" to="#">Forgot?</Link>
                                    </div>
                                    <Input
                                        id="password"
                                        type={showPassword ? 'text' : 'password'}
                                        required
                                        leftIcon={Lock}
                                        placeholder="••••••••"
                                        value={formData.password}
                                        onChange={handleChange}
                                        rightIcon={
                                            <button type="button" onClick={() => setShowPassword(!showPassword)} className="text-slate-400 hover:text-primary-600 transition-colors">
                                                <span className="material-symbols-outlined text-[18px]">{showPassword ? 'visibility_off' : 'visibility'}</span>
                                            </button>
                                        }
                                    />
                                </div>
                            ) : (
                                otpSent && (
                                    <Input
                                        label="Enter OTP"
                                        id="otp"
                                        type="text"
                                        required
                                        leftIcon={Check}
                                        placeholder="123456"
                                        value={formData.otp}
                                        onChange={handleChange}
                                    />
                                )
                            )}

                            <Button type="submit" loading={loading} fullWidth size="lg">
                                {loginMode === 'otp' && !otpSent ? 'Send OTP' : 'Sign In'}
                            </Button>

                            <div className="text-center mt-4">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setLoginMode(loginMode === 'otp' ? 'password' : 'otp');
                                        setOtpSent(false);
                                        setError('');
                                    }}
                                    className="text-xs font-bold text-primary-600 hover:underline"
                                >
                                    {loginMode === 'otp' ? 'Login via Password' : 'Login via OTP'}
                                </button>
                            </div>
                        </form>
                    )}

                    {/* --- REGISTER STEP 1: Email + OTP --- */}
                    {!isLogin && step === 1 && (
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
                            {loginMode === 'password' ? (
                                <Input
                                    label="Create Password"
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    required
                                    leftIcon={Lock}
                                    placeholder="••••••••"
                                    value={formData.password}
                                    onChange={handleChange}
                                    rightIcon={
                                        <button type="button" onClick={() => setShowPassword(!showPassword)} className="text-slate-400 hover:text-primary-600 transition-colors">
                                            <span className="material-symbols-outlined text-[18px]">{showPassword ? 'visibility_off' : 'visibility'}</span>
                                        </button>
                                    }
                                />
                            ) : (
                                otpSent && (
                                    <Input
                                        label="One-Time Password"
                                        id="otp"
                                        type="text"
                                        required
                                        leftIcon={Lock}
                                        placeholder="Check your email"
                                        value={formData.otp}
                                        onChange={handleChange}
                                    />
                                )
                            )}
                            <Button
                                onClick={loginMode === 'password' ? () => setStep(2) : (otpSent ? handleVerifyOTP : handleSendOTP)}
                                loading={loading}
                                fullWidth
                                size="lg"
                            >
                                {loginMode === 'password' ? 'Continue' : (otpSent ? 'Verify OTP' : 'Send OTP')}
                            </Button>
                            {otpSent && (
                                <button
                                    onClick={handleSendOTP}
                                    className="w-full text-xs font-bold text-primary-600 hover:underline"
                                >
                                    Resend OTP
                                </button>
                            )}

                            <div className="text-center mt-2">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setLoginMode(loginMode === 'otp' ? 'password' : 'otp');
                                        setOtpSent(false);
                                        setError('');
                                    }}
                                    className="text-xs font-bold text-slate-400 hover:text-primary-600 transition-colors"
                                >
                                    {loginMode === 'otp' ? 'Signup via Password' : 'Signup via OTP'}
                                </button>
                            </div>
                        </div>
                    )}

                    {/* --- REGISTER STEP 2: Username (Slug) --- */}
                    {!isLogin && step === 2 && (
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
                                <Button variant="secondary" onClick={() => setStep(1)} size="lg">
                                    Back
                                </Button>
                                <Button
                                    onClick={handleNextStep}
                                    disabled={slugStatus.state !== 'available'}
                                    size="lg"
                                >
                                    Continue
                                </Button>
                            </div>
                        </div>
                    )}

                    {/* --- REGISTER STEP 3: Business Info --- */}
                    {!isLogin && step === 3 && (
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
                            <Input id="phoneNumber" label="Phone Number" placeholder="+1 234 567 890" value={formData.phoneNumber} onChange={handleChange} />
                            <Input id="googleReviewLink" label="Google Review Link" placeholder="https://g.page/r/..." required value={formData.googleReviewLink} onChange={handleChange} />

                            <div className="space-y-1.5 text-left">
                                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider ml-1">Services Offered</label>
                                <textarea
                                    id="services"
                                    placeholder="e.g. Web Design, SEO, Hosting (comma separated)"
                                    className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl outline-none resize-none h-24 text-sm font-medium placeholder:text-slate-400 placeholder:font-normal focus:ring-4 focus:ring-primary-600/10 focus:border-primary-600 transition-all text-slate-900"
                                    value={formData.services}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-3 pt-1">
                                <Button variant="secondary" onClick={() => setStep(2)} size="lg">
                                    Back
                                </Button>
                                <Button onClick={handleNextStep} size="lg">
                                    Continue
                                </Button>
                            </div>
                        </div>
                    )}

                    {/* --- REGISTER STEP 4: Password --- */}
                    {!isLogin && step === 4 && (
                        <div className="space-y-4">
                            <Input
                                label="Password (Optional)"
                                id="password"
                                type={showPassword ? 'text' : 'password'}
                                leftIcon={Lock}
                                placeholder="••••••••"
                                value={formData.password}
                                onChange={handleChange}
                                rightIcon={
                                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="text-slate-400 hover:text-primary-600 transition-colors">
                                        <span className="material-symbols-outlined text-[18px]">{showPassword ? 'visibility_off' : 'visibility'}</span>
                                    </button>
                                }
                            />
                            <p className="text-[11px] text-slate-500 px-1">You can skip this and log in with OTP later.</p>
                            <div className="grid grid-cols-2 gap-3 pt-1">
                                <Button variant="secondary" onClick={() => setStep(3)} size="lg">
                                    Back
                                </Button>
                                <Button onClick={handleRegister} loading={loading} size="lg">
                                    {formData.password ? 'Finish Setup' : 'Skip & Finish'}
                                </Button>
                            </div>
                        </div>
                    )}



                    <div className="mt-6 text-center">
                        <p className="text-slate-500 text-[13px] font-medium">
                            {isLogin ? "Don't have an account?" : step < 4 ? "Already have an account?" : ""}
                            {!isLogin && step < 4 && (
                                <Link className="text-primary-600 font-bold hover:underline ml-1" to="/login">Log in here</Link>
                            )}
                            {isLogin && (
                                <Link className="text-primary-600 font-bold hover:underline ml-1" to="/register">Sign up for free</Link>
                            )}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Auth;
