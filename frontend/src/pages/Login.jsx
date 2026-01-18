import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Check, AlertCircle, Sparkles, Loader2, Eye, EyeOff } from 'lucide-react';
import { api } from '../api';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';

const Login = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    // Login Mode: 'otp' or 'password'
    const [loginMode, setLoginMode] = useState('otp');
    const [otpSent, setOtpSent] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        otp: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
        setError('');
    };

    const handleSendOTP = async () => {
        if (!formData.email) return setError('Please enter your email');

        setLoading(true);
        setError('');
        try {
            await api.sendOTP(formData.email);
            setOtpSent(true);
            setSuccessMessage('Access code sent to your email');
            setTimeout(() => setSuccessMessage(''), 3000);
        } catch (err) {
            setError(err.message || 'Failed to send OTP');
        } finally {
            setLoading(false);
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        // If in OTP mode and OTP hasn't been sent yet, send it first
        if (loginMode === 'otp' && !otpSent) {
            return handleSendOTP();
        }

        setLoading(true);
        setError('');

        try {
            const credentials = { email: formData.email };
            if (loginMode === 'password') credentials.password = formData.password;
            else credentials.otp = formData.otp;

            // 1. Perform Login
            const data = await api.login(credentials);

            // 2. Store Auth Data
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data));

            // 3. INTELLIGENT REDIRECT: Check if business exists
            // This handles the "User verified but closed tab" scenario
            try {
                await api.getMyBusiness();
                // If successful, business exists -> Go to Dashboard
                navigate('/dashboard');
            } catch (bizErr) {
                // If 404 (or other error), business setup is incomplete -> Go to Setup
                navigate('/create-business');
            }
        } catch (err) {
            setError(err.message || 'Login failed. Please check your credentials.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen w-full flex-col lg:flex-row bg-white font-sans text-slate-900">
            {/* Left Side Branding (Desktop Only) */}
            <div className="relative hidden w-1/2 flex-col justify-between overflow-hidden lg:flex bg-primary-600"
                style={{ background: 'linear-gradient(135deg, #2463eb 0%, #38bdf8 100%)' }}>
                <div className="absolute inset-0 opacity-20 pointer-events-none">
                    <svg height="100%" width="100%"><defs><pattern height="40" id="grid-login" patternUnits="userSpaceOnUse" width="40"><path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1"></path></pattern></defs><rect fill="url(#grid-login)" height="100%" width="100%"></rect></svg>
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
                    <h1 className="text-white text-4xl font-bold leading-tight tracking-tight max-w-sm">Welcome Back</h1>
                    <p className="text-white/80 text-base mt-4 max-w-xs">Manage your reputation and view your latest AI-generated reviews.</p>
                </div>
                <div className="z-10 px-10 py-8 text-white/60 text-xs">© {new Date().getFullYear()} RevLinko Inc.</div>
            </div>

            {/* Right Side Form (Mobile & Desktop) */}
            {/* Removed justify-center on mobile to allow top spacing */}
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
                {/* On Mobile: Removed shadow, border, and bg-white card look. It's now flat and full width. */}
                {/* On Desktop (lg): Kept the card look for the split screen layout. */}
                <div className="w-full max-w-[440px] mx-auto lg:bg-white lg:p-12 lg:rounded-[32px] lg:shadow-2xl lg:shadow-slate-200/50 lg:border lg:border-slate-100 animate-in fade-in zoom-in duration-500">
                    <div className="mb-10 text-center lg:text-left">
                        <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-3">Sign In</h2>
                        <p className="text-slate-500 font-medium">
                            {loginMode === 'password' ? 'Enter your details to access your account' : 'We will send a login code to your email'}
                        </p>
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

                    <form className="space-y-5" onSubmit={handleLogin}>
                        <Input
                            label="Email Address"
                            id="email"
                            type="email"
                            required
                            leftIcon={Mail}
                            placeholder="name@company.com"
                            value={formData.email}
                            onChange={handleChange}
                            className="border-slate-200 focus:bg-white transition-all"
                        />

                        {loginMode === 'password' ? (
                            <div className="space-y-2">
                                <div className="flex justify-between items-center px-1">
                                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Password</label>
                                    <button type="button" className="text-xs font-bold text-primary-600 hover:underline">Forgot?</button>
                                </div>
                                <Input
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    required
                                    leftIcon={Lock}
                                    placeholder="••••••••"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="bg-slate-50 border-slate-200 focus:bg-white transition-all"
                                    rightIcon={
                                        <button type="button" onClick={() => setShowPassword(!showPassword)} className="text-slate-400 hover:text-primary-600 transition-colors">
                                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                        </button>
                                    }
                                />
                            </div>
                        ) : (
                            otpSent && (
                                <Input
                                    label="Access Code"
                                    id="otp"
                                    type="text"
                                    required
                                    leftIcon={Check}
                                    placeholder="123456"
                                    value={formData.otp}
                                    onChange={handleChange}
                                    className="bg-slate-50 border-slate-200 focus:bg-white transition-all"
                                />
                            )
                        )}

                        <Button
                            type="submit"
                            loading={loading}
                            fullWidth
                            size="lg"
                            className={`h-12 text-base transition-all duration-300 ${!formData.email
                                ? 'bg-slate-100 text-slate-400 border-slate-100 shadow-none'
                                : 'shadow-lg shadow-primary-500/20'
                                }`}
                            variant={!formData.email ? 'secondary' : 'primary'}
                        >
                            {loginMode === 'otp' && !otpSent ? 'Send Login Code' : 'Sign In'}
                        </Button>

                        <div className="text-center pt-2">
                            <button
                                type="button"
                                onClick={() => {
                                    setLoginMode(loginMode === 'otp' ? 'password' : 'otp');
                                    setOtpSent(false);
                                    setError('');
                                }}
                                className="text-sm font-bold text-slate-400 hover:text-slate-600 transition-colors"
                            >
                                {loginMode === 'otp' ? 'Login with Password' : 'Login with OTP code'}
                            </button>
                        </div>
                    </form>

                    <div className="mt-10 text-center pt-8 border-t border-slate-100">
                        <p className="text-slate-500 text-sm font-medium">
                            Don't have an account?
                            <Link className="text-primary-600 font-bold hover:underline ml-1" to="/register">Sign up for free</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;