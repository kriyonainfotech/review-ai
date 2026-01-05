import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { Lock, Rocket, Mail, Github, Loader2 } from 'lucide-react';
import { api } from '../api';

const Auth = ({ isLogin }) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            let data;
            if (isLogin) {
                data = await api.login({ email: formData.email, password: formData.password });
            } else {
                data = await api.register({ name: formData.name, email: formData.email, password: formData.password });
            }

            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data));
            navigate('/dashboard');
        } catch (err) {
            setError(err.message || 'Authentication failed. Please check your credentials.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen pt-20 pb-12 flex flex-col items-center justify-center bg-zinc-50 px-4">
            <Card className="max-w-md p-10 shadow-xl border-zinc-100 animate-fade-in-up">
                <div className="text-center mb-8">
                    <div className="w-14 h-14 bg-primary-100 text-primary-600 rounded-2xl flex items-center justify-center mx-auto mb-6 ring-8 ring-primary-50">
                        {isLogin ? <Lock size={28} /> : <Rocket size={28} />}
                    </div>
                    <h2 className="text-3xl font-extrabold text-zinc-900 tracking-tight mb-2">
                        {isLogin ? 'Welcome back' : 'Get started free'}
                    </h2>
                    <p className="text-zinc-500 font-medium">
                        {isLogin ? 'Sign in to manage your business' : 'Join 2,000+ businesses growing today'}
                    </p>
                </div>

                {error && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 text-sm font-bold rounded-xl flex items-center gap-2">
                        <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    {!isLogin && (
                        <Input
                            label="Full Name"
                            id="name"
                            placeholder="Alex Morgan"
                            required
                            value={formData.name}
                            onChange={handleChange}
                            className="mb-4"
                        />
                    )}
                    <Input
                        label="Email Address"
                        id="email"
                        type="email"
                        placeholder="name@company.com"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="mb-4"
                    />
                    <div className="relative">
                        <Input
                            label="Password"
                            id="password"
                            type="password"
                            placeholder="••••••••"
                            required
                            value={formData.password}
                            onChange={handleChange}
                        />
                        {isLogin && (
                            <Link
                                to="#"
                                className="absolute top-0 right-1 text-xs text-primary-600 font-bold hover:text-primary-700 underline underline-offset-4"
                            >
                                Forgot password?
                            </Link>
                        )}
                    </div>

                    <Button
                        fullWidth
                        size="lg"
                        className="h-14 mt-4 shadow-lg shadow-primary-500/10"
                        disabled={loading}
                    >
                        {loading ? (
                            <>
                                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                Please wait...
                            </>
                        ) : (
                            isLogin ? 'Sign In' : 'Create Account'
                        )}
                    </Button>
                </form>

                <div className="mt-8 text-center text-[15px] font-medium text-zinc-500">
                    {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
                    <Link to={isLogin ? '/register' : '/login'} className="text-primary-600 font-bold hover:text-primary-700 ml-1">
                        {isLogin ? 'Sign up' : 'Log in'}
                    </Link>
                </div>
            </Card>

            <div className="mt-8 flex gap-8 text-xs font-bold uppercase tracking-widest text-zinc-400">
                <Link to="#" className="hover:text-zinc-900 transition-colors">Terms</Link>
                <Link to="#" className="hover:text-zinc-900 transition-colors">Privacy</Link>
                <Link to="#" className="hover:text-zinc-900 transition-colors">Security</Link>
            </div>
        </div>
    );
};

export default Auth;
