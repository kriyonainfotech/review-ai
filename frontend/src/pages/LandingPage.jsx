import React from 'react';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import {
    Zap,
    ArrowRight,
    CheckCircle2,
    Building2,
    PlusCircle,
    TrendingUp,
    ShieldCheck, Sparkles
} from 'lucide-react';

const LandingPage = () => {
    return (
        <div className="bg-slate-50 min-h-screen font-sans selection:bg-primary-100 selection:text-primary-900">
            {/* Hero Section */}
            <section className="max-w-7xl mx-auto px-6 py-20 lg:py-32">
                <div className="flex flex-col lg:flex-row items-center gap-16">
                    <div className="flex-1 text-center lg:text-left">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-100/50 text-primary-600 text-xs font-bold tracking-widest uppercase mb-6">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-600 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-600"></span>
                            </span>
                            NEW: AI Response Generation
                        </div>
                        <h1 className="text-zinc-900 text-5xl lg:text-7xl font-black leading-[1.1] tracking-tight mb-8">
                            Turn Customers Into <span className="text-primary-600 underline decoration-primary-600/20 decoration-8 underline-offset-8">5-Star</span> Reviews
                        </h1>
                        <p className="text-lg text-slate-600 max-w-xl mx-auto lg:mx-0 mb-10 leading-relaxed font-medium">
                            Automate your reputation management with AI-powered review links designed for local businesses. Direct your happy customers to Google in one tap.
                        </p>
                        <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                            <button className="bg-primary-600 text-white text-lg font-bold px-10 py-4 rounded-full hover:scale-105 transition-transform shadow-xl shadow-primary-500/30">
                                Start Free Trial
                            </button>
                            <button className="bg-white border-2 border-[#f0f1f4] text-lg font-bold px-10 py-4 rounded-full hover:bg-slate-50 transition-colors text-zinc-900">
                                View Demo
                            </button>
                        </div>
                    </div>
                    <div className="flex-1 w-full relative">
                        <div className="aspect-video w-full rounded-[2rem] overflow-hidden shadow-2xl relative group bg-white">
                            <div className="absolute inset-0 bg-gradient-to-tr from-primary-600/10 to-transparent pointer-events-none"></div>
                            <img
                                alt="Dashboard visualization"
                                className="w-full h-full object-cover"
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDiYumi0zjSlq4JZX0b-CadhmzdaDu4naBtOtuV_71vois3pIyPjwM5_BG2NhslMr4Gbjq8FMH_2nXoEjL3NTRzKeJ2P09HWUmronamaw6omL__XD7gmi-BicW1Ki1SsQKdqwSzt5KV5Qqwg8di6fgKSFC7b6z9wmF9RI0OHwzyPC-pwZK_XXgjZERjaVUKAcTq-1EzlAMVuh5_xZEFa2UFFxIqRT3D-G-4p85McmB0Ww8pSjYfooZ87i1rf86TywhI8XjqMXu_FaRP"
                            />
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20 backdrop-blur-sm cursor-pointer">
                                <span className="material-symbols-outlined text-white text-6xl">play_circle</span>
                            </div>
                        </div>
                        {/* Floating Badge */}
                        <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl flex items-center gap-4 border border-slate-100 max-w-[240px]">
                            <div className="bg-green-100 p-2 rounded-full">
                                <span className="material-symbols-outlined text-green-600">trending_up</span>
                            </div>
                            <div>
                                <p className="text-sm font-bold text-zinc-900">+127%</p>
                                <p className="text-xs text-slate-500">Review growth rate</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Social Proof Strip */}
            <section className="border-y border-slate-100 py-10 bg-white">
                <div className="max-w-7xl mx-auto px-6 flex flex-wrap justify-center items-center gap-12 opacity-50 grayscale">
                    <div className="text-sm font-bold uppercase tracking-widest text-slate-400">Trusted by:</div>
                    <div className="h-8 w-24 bg-slate-200 rounded-md"></div>
                    <div className="h-8 w-24 bg-slate-200 rounded-md"></div>
                    <div className="h-8 w-24 bg-slate-200 rounded-md"></div>
                    <div className="h-8 w-24 bg-slate-200 rounded-md"></div>
                </div>
            </section>

            {/* How It Works */}
            <section className="py-24 bg-white" id="features">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex flex-col gap-4 mb-16 max-w-2xl">
                        <h2 className="text-primary-600 text-sm font-bold uppercase tracking-[0.2em]">Process</h2>
                        <h1 className="text-4xl lg:text-5xl font-black tracking-tight text-zinc-900">Three Simple Steps to Success</h1>
                        <p className="text-slate-500 leading-relaxed text-lg font-medium">Our streamlined process helps you focus on your business while we handle the reputation management automatically.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Step 1 */}
                        <div className="group p-8 rounded-[2rem] border border-slate-100 hover:border-primary-600/20 transition-all hover:bg-white hover:shadow-2xl hover:shadow-primary-600/5 bg-slate-50/50">
                            <div className="size-14 rounded-2xl bg-primary-600 text-white flex items-center justify-center mb-8 group-hover:scale-110 transition-transform shadow-lg shadow-primary-500/20">
                                <span className="material-symbols-outlined text-3xl">link</span>
                            </div>
                            <h3 className="text-xl font-bold mb-4 text-zinc-900">1. Generate Link</h3>
                            <p className="text-slate-500 leading-relaxed font-medium">Create custom AI-powered short links that identify customers and track conversion sources in seconds.</p>
                        </div>
                        {/* Step 2 */}
                        <div className="group p-8 rounded-[2rem] border border-slate-100 hover:border-primary-600/20 transition-all hover:bg-white hover:shadow-2xl hover:shadow-primary-600/5 bg-slate-50/50">
                            <div className="size-14 rounded-2xl bg-primary-600 text-white flex items-center justify-center mb-8 group-hover:scale-110 transition-transform shadow-lg shadow-primary-500/20">
                                <span className="material-symbols-outlined text-3xl">qr_code_2</span>
                            </div>
                            <h3 className="text-xl font-bold mb-4 text-zinc-900">2. Share with Customer</h3>
                            <p className="text-slate-500 leading-relaxed font-medium">Send via SMS, automated Email, or display a beautiful QR code in-store for instant feedback.</p>
                        </div>
                        {/* Step 3 */}
                        <div className="group p-8 rounded-[2rem] border border-slate-100 hover:border-primary-600/20 transition-all hover:bg-white hover:shadow-2xl hover:shadow-primary-600/5 bg-slate-50/50">
                            <div className="size-14 rounded-2xl bg-primary-600 text-white flex items-center justify-center mb-8 group-hover:scale-110 transition-transform shadow-lg shadow-primary-500/20">
                                <span className="material-symbols-outlined text-3xl">auto_awesome</span>
                            </div>
                            <h3 className="text-xl font-bold mb-4 text-zinc-900">3. Get 5-Star Reviews</h3>
                            <p className="text-slate-500 leading-relaxed font-medium">Direct happy customers straight to your Google profile while filtering negative feedback internally.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Use Cases / Industries */}
            <section className="py-24 bg-slate-50" id="use-cases">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-black tracking-tight mb-4 text-zinc-900">Built for Every Industry</h2>
                        <p className="text-slate-500 max-w-xl mx-auto font-medium">Optimized landing experiences tailored to your specific business type.</p>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Industry 1 */}
                        <div className="bg-white rounded-[2rem] overflow-hidden group shadow-sm hover:shadow-xl transition-all border border-slate-100">
                            <div className="h-56 overflow-hidden relative">
                                <img
                                    alt="Dental Clinic"
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDoySe_2sawgWStCge-qpNkqdKRRBStw1BkNtbkEu0SnLUDQXyk4OB8khiJDOxhG0TJEhFCA-7RyS_I8Ptk5l_Sp-9w6dGqFNaJOVmFLH_oebOVXRaMK-YCHpfOABF3VVnPChbUONOonezPpkgvDe9qo1LhgazYHqvNn_54F2gCwu2I_cZl1sPcQ_BaOEZe0Qui0kkOVRoJtpReyqrxRGqJdw_ijVYz_XOH3VBxFYpGkdwYYSN2xd0Olpdy_PLxd8dH3I_XDtrllbto"
                                />
                            </div>
                            <div className="p-8">
                                <h3 className="text-xl font-bold mb-3 text-zinc-900">Dental Clinics</h3>
                                <p className="text-slate-500 text-sm leading-relaxed mb-6 font-medium">Build patient trust automatically. Patients receive a review request 30 minutes after their appointment.</p>
                                <a className="text-primary-600 font-bold text-sm flex items-center gap-2 group/link" href="#">
                                    Learn More <span className="material-symbols-outlined text-sm group-hover/link:translate-x-1 transition-transform">arrow_forward</span>
                                </a>
                            </div>
                        </div>
                        {/* Industry 2 */}
                        <div className="bg-white rounded-[2rem] overflow-hidden group shadow-sm hover:shadow-xl transition-all border border-slate-100">
                            <div className="h-56 overflow-hidden relative">
                                <img
                                    alt="Real Estate"
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBt-BXY5OHU7ed8A8XnrnDl7mCiO0uIM2rOXKAR4I7X23XkWrOy-CIr9yqq2Jn4igKmzqNmAS68NGcLp6QCEnVnv45o0F69ZIUvb1HAIiMzB2y5DS0kX5PZLgOu0O56glM7Cqft_Lumy1JEcudzSRHD-oJvKNxB_MPkRLBD6ypLDl7eiYdexwVT618ngrWhc_sK22H5AMyYT5eJGPS5GJb7i8xHzle7BcEN82oItKn_f_PqJoAoVDj5R8KnvisdfBdpDIW1oqQ6J1Q-"
                                />
                            </div>
                            <div className="p-8">
                                <h3 className="text-xl font-bold mb-3 text-zinc-900">Real Estate</h3>
                                <p className="text-slate-500 text-sm leading-relaxed mb-6 font-medium">Close deals and collect testimonials instantly. Send links as soon as the keys are handed over.</p>
                                <a className="text-primary-600 font-bold text-sm flex items-center gap-2 group/link" href="#">
                                    Learn More <span className="material-symbols-outlined text-sm group-hover/link:translate-x-1 transition-transform">arrow_forward</span>
                                </a>
                            </div>
                        </div>
                        {/* Industry 3 */}
                        <div className="bg-white rounded-[2rem] overflow-hidden group shadow-sm hover:shadow-xl transition-all border border-slate-100">
                            <div className="h-56 overflow-hidden relative">
                                <img
                                    alt="Restaurants"
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAW9KCD9iI78USK8RRqv1NFkvcNYlM3O7Q9hnR6k6Xx6cyzGAc9ynYeVwrnv2Tsg_D9A8KFtiGlM6yerPgGe8sjTUjQu2CWE36ziBAuPrwgSMVyPzYHiGlBeM39Ex1oT-cnuPEWJyJmdQjxidG1H0fab2MHaR7YzpxhYJlJVlsyXsCjJJw30hRdCVNxRLfVYUKe7DyMNHXLrm8dY_hu-xe06wYmeheJBUHGdgwFILEibw6TK1-InJSybD94GZUHLKpoA6gWS0ElA8Ut"
                                />
                            </div>
                            <div className="p-8">
                                <h3 className="text-xl font-bold mb-3 text-zinc-900">Restaurants</h3>
                                <p className="text-slate-500 text-sm leading-relaxed mb-6 font-medium">Turn diners into promoters. QR codes on menus and bills make it easy to share the love.</p>
                                <a className="text-primary-600 font-bold text-sm flex items-center gap-2 group/link" href="#">
                                    Learn More <span className="material-symbols-outlined text-sm group-hover/link:translate-x-1 transition-transform">arrow_forward</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Final CTA Banner */}
            <section className="py-24 max-w-7xl mx-auto px-6">
                <div className="relative bg-primary-600 rounded-[3rem] p-12 lg:p-24 overflow-hidden text-center shadow-2xl shadow-primary-500/20">
                    <div className="absolute inset-0 opacity-10 pointer-events-none">
                        <svg height="100%" width="100%" xmlns="http://www.w3.org/2000/svg">
                            <defs>
                                <pattern height="40" id="grid" patternUnits="userSpaceOnUse" width="40">
                                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1"></path>
                                </pattern>
                            </defs>
                            <rect fill="url(#grid)" height="100%" width="100%"></rect>
                        </svg>
                    </div>
                    <div className="relative z-10 max-w-3xl mx-auto">
                        <h2 className="text-white text-4xl lg:text-6xl font-black mb-8 leading-tight">Ready to dominate your local market?</h2>
                        <p className="text-blue-100 text-lg mb-12 font-medium">Join 500+ businesses using RevLinko to boost their SEO and gain customer trust. No credit card required to start.</p>
                        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                            <button className="w-full sm:w-auto bg-white text-primary-600 text-lg font-bold px-12 py-5 rounded-full hover:scale-105 transition-all shadow-xl">
                                Get Started Now
                            </button>
                            <button className="w-full sm:w-auto bg-primary-500/20 text-white border border-white/30 text-lg font-bold px-12 py-5 rounded-full hover:bg-primary-500/30 transition-all backdrop-blur-sm">
                                Schedule a Demo
                            </button>
                        </div>
                        <div className="mt-12 flex flex-wrap justify-center items-center gap-8 text-white/70 text-sm font-semibold">
                            <span className="flex items-center gap-2"><span className="material-symbols-outlined text-green-400">check_circle</span> 14-day free trial</span>
                            <span className="flex items-center gap-2"><span className="material-symbols-outlined text-green-400">check_circle</span> No credit card</span>
                            <span className="flex items-center gap-2"><span className="material-symbols-outlined text-green-400">check_circle</span> Set up in 2 minutes</span>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default LandingPage;
