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
        <div className="animate-fade-in-up">
            {/* --- HERO SECTION --- */}
            <section className="pt-32 pb-24 bg-white relative overflow-hidden">
                {/* Decorative Background Elements */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full -z-10">
                    <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary-100/30 rounded-full blur-[120px]"></div>
                    <div className="absolute bottom-[10%] right-[-5%] w-[30%] h-[30%] bg-indigo-100/30 rounded-full blur-[100px]"></div>
                </div>

                <div className="container-tight flex flex-col items-center text-center">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-50 border border-primary-100 text-primary-600 text-xs font-bold mb-8">
                        <Zap size={14} fill="currentColor" />
                        <span>AI-Powered Review Assistant</span>
                    </div>

                    {/* Main Headline */}
                    <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-zinc-900 max-w-4xl mb-8 leading-[1.1]">
                        Turn happy customers into <br />
                        <span className="text-gradient">Google reviews</span>.
                    </h1>

                    {/* Subheadline */}
                    <p className="text-xl text-zinc-500 max-w-2xl mb-12 font-medium leading-relaxed">
                        Our AI generates personalized review suggestions and creates a smart link-in-bio page for your business. No begging required.
                    </p>

                    {/* CTAs */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20 w-full sm:w-auto">
                        <Button to="/register" size="lg" className="min-w-[200px]" icon={ArrowRight} iconPosition="right">
                            Get Started Free
                        </Button>
                        <Button variant="secondary" size="lg" className="min-w-[200px]">
                            View Live Demo
                        </Button>
                    </div>

                    {/* Dashboard Preview */}
                    <div className="relative w-full max-w-5xl group">
                        <div className="absolute -inset-1 bg-linear-to-r from-primary-500 to-indigo-500 rounded-[2rem] blur-xl opacity-20 group-hover:opacity-30 transition duration-500"></div>
                        <div className="relative bg-white rounded-[2rem] border border-zinc-200 shadow-2xl p-4 overflow-hidden">
                            <div className="bg-zinc-50 rounded-2xl overflow-hidden border border-zinc-100 aspect-video flex flex-col">
                                {/* Browser Toolbar */}
                                <div className="h-10 bg-white border-b border-zinc-200 px-4 flex items-center justify-between">
                                    <div className="flex gap-1.5">
                                        <div className="w-3 h-3 rounded-full bg-red-400"></div>
                                        <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                                        <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
                                    </div>
                                    <div className="flex-1 max-w-md mx-4 h-6 bg-zinc-100 rounded-md"></div>
                                    <div className="w-20"></div>
                                </div>
                                {/* Mock UI */}
                                <div className="flex-1 grid grid-cols-12 gap-6 p-8">
                                    {/* Sidebar */}
                                    <div className="col-span-3 flex flex-col gap-4">
                                        {[1, 2, 3, 4].map(i => (
                                            <div key={i} className="h-10 bg-zinc-200/50 rounded-xl"></div>
                                        ))}
                                    </div>
                                    {/* Main Content */}
                                    <div className="col-span-9 space-y-6">
                                        <div className="grid grid-cols-3 gap-4">
                                            {[1, 2, 3].map(i => (
                                                <div key={i} className="h-28 bg-white border border-zinc-200 rounded-2xl shadow-sm"></div>
                                            ))}
                                        </div>
                                        <div className="h-64 bg-white border border-zinc-200 rounded-2xl shadow-sm"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- FEATURES SECTION --- */}
            <section className="py-24 bg-zinc-50 border-y border-zinc-100">
                <div className="container-tight">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">How it works</h2>
                        <p className="text-zinc-500 font-medium max-w-lg mx-auto leading-relaxed">
                            Streamlined for speed. Get set up in minutes and start growing your business presence.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Step 1 */}
                        <Card hover className="p-8 flex flex-col items-start text-left group">
                            <div className="w-14 h-14 bg-primary-100 text-primary-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                <Building2 size={28} />
                            </div>
                            <div className="inline-flex items-center justify-center w-7 h-7 bg-primary-600 text-white text-xs font-bold rounded-full mb-4">1</div>
                            <h3 className="text-xl font-bold mb-3 text-zinc-900">Connect Profile</h3>
                            <p className="text-zinc-500 leading-relaxed font-medium">
                                Link your Google Business Profile. We automatically verify ownership and import your details.
                            </p>
                        </Card>

                        {/* Step 2 */}
                        <Card hover className="p-8 flex flex-col items-start text-left group">
                            <div className="w-14 h-14 bg-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                <Sparkles size={28} />
                            </div>
                            <div className="inline-flex items-center justify-center w-7 h-7 bg-indigo-600 text-white text-xs font-bold rounded-full mb-4">2</div>
                            <h3 className="text-xl font-bold mb-3 text-zinc-900">AI Generation</h3>
                            <p className="text-zinc-500 leading-relaxed font-medium">
                                Our AI builds a smart bio link and pre-writes 5-star review suggestions based on your business type.
                            </p>
                        </Card>

                        {/* Step 3 */}
                        <Card hover className="p-8 flex flex-col items-start text-left group">
                            <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                <TrendingUp size={28} />
                            </div>
                            <div className="inline-flex items-center justify-center w-7 h-7 bg-emerald-600 text-white text-xs font-bold rounded-full mb-4">3</div>
                            <h3 className="text-xl font-bold mb-3 text-zinc-900">Collect & Grow</h3>
                            <p className="text-zinc-500 leading-relaxed font-medium">
                                Share your link via QR or SMS. Customers tap "Copy & Paste" to leave perfect reviews instantly.
                            </p>
                        </Card>
                    </div>
                </div>
            </section>

            {/* --- TRUST SECTION --- */}
            <section className="py-24 bg-white">
                <div className="container-tight grid md:grid-cols-2 gap-16 items-center">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">
                            Everything you need to <span className="text-primary-600">dominate</span> local search.
                        </h2>
                        <div className="space-y-4">
                            {[
                                "Automatic Google Business synchronization",
                                "AI-powered review text templates",
                                "QR Code generation for easy offline access",
                                "Detailed analytics and conversion tracking",
                                "Secure and verified review collection"
                            ].map((feature, i) => (
                                <div key={i} className="flex items-center gap-3">
                                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600 border border-emerald-100">
                                        <CheckCircle2 size={16} />
                                    </div>
                                    <span className="text-zinc-600 font-medium">{feature}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="relative">
                        <div className="absolute -inset-4 bg-primary-100 rounded-3xl blur-[60px] opacity-40 -rotate-3"></div>
                        <Card className="relative p-0 overflow-hidden border-2 border-primary-100">
                            <div className="bg-primary-600 p-8 text-white">
                                <ShieldCheck size={48} className="mb-4 text-primary-200" />
                                <p className="text-2xl font-bold italic mb-0">"The easiest way to get reviews we've ever used. Our conversion rate tripled in 2 weeks."</p>
                            </div>
                            <div className="p-8 flex items-center gap-4 bg-white">
                                <div className="w-12 h-12 bg-zinc-100 rounded-full"></div>
                                <div>
                                    <p className="font-bold text-zinc-900">Sarah Jenkins</p>
                                    <p className="text-sm text-zinc-500 font-medium">Owner, Bloom Florals</p>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </section>

            {/* --- FINAL CTA --- */}
            <section className="py-32 relative group overflow-hidden">
                <div className="absolute inset-0 bg-zinc-900"></div>
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#fff_1.5px,transparent_1.5px)] [background-size:32px_32px]"></div>

                <div className="container-tight relative z-10 text-center">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 tracking-tight">
                        Ready to grow your reputation?
                    </h2>
                    <p className="text-zinc-400 text-lg mb-12 max-w-xl mx-auto font-medium">
                        Join 2,000+ businesses using ReviewLink to grow their online presence and attract more customers.
                    </p>
                    <div className="flex justify-center">
                        <Button size="lg" to="/register" className="h-16 px-12 text-lg shadow-xl shadow-primary-500/20" icon={Sparkles}>
                            Get Started Free
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default LandingPage;
