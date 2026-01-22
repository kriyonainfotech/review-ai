import React from 'react';
import { FileText, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const TermsOfService = () => {
    return (
        <div className="min-h-screen bg-white font-sans text-zinc-900">
            {/* Header */}
            <div className="border-b border-zinc-100 sticky top-0 bg-white/80 backdrop-blur-md z-10">
                <div className="max-w-4xl mx-auto px-6 h-20 flex items-center justify-between">
                    <Link to="/" className="flex items-center gap-2 text-zinc-600 hover:text-primary-600 transition-colors">
                        <ArrowLeft size={20} />
                        <span className="font-semibold text-sm">Back to Home</span>
                    </Link>
                    <div className="flex items-center gap-2 text-primary-600">
                        <FileText size={24} fill="currentColor" />
                        <span className="font-black tracking-tight">RevLinko Legal</span>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-3xl mx-auto px-6 py-16">
                <h1 className="text-4xl lg:text-5xl font-black mb-4 tracking-tight">Terms of Service</h1>
                <p className="text-zinc-500 mb-12 font-medium">Last Updated: January 22, 2026</p>

                <div className="prose prose-zinc max-w-none space-y-12">
                    <section>
                        <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                            <span className="w-8 h-8 rounded-lg bg-primary-100 text-primary-600 flex items-center justify-center text-sm font-black">1</span>
                            Agreement to Terms
                        </h2>
                        <p className="text-zinc-600 leading-relaxed text-lg">
                            By accessing or using RevLinko, you agree to be bound by these Terms of Service. If you do not agree, you may not use our platform.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                            <span className="w-8 h-8 rounded-lg bg-primary-100 text-primary-600 flex items-center justify-center text-sm font-black">2</span>
                            Service Description
                        </h2>
                        <p className="text-zinc-600 leading-relaxed">
                            RevLinko provides an AI-powered reputation management platform helping businesses collect and manage customer reviews. We provide tools for link generation, QR codes, and performance tracking.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                            <span className="w-8 h-8 rounded-lg bg-primary-100 text-primary-600 flex items-center justify-center text-sm font-black">3</span>
                            Subscription and Payments
                        </h2>
                        <p className="text-zinc-600 leading-relaxed mb-4">
                            Certain features require a paid subscription. All fees are non-refundable unless otherwise required by law.
                        </p>
                        <ul className="list-disc pl-6 text-zinc-600 space-y-2">
                            <li>Subscriptions auto-renew unless cancelled.</li>
                            <li>You are responsible for all charges incurred.</li>
                            <li>Pricing is subject to change with notice.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                            <span className="w-8 h-8 rounded-lg bg-primary-100 text-primary-600 flex items-center justify-center text-sm font-black">4</span>
                            Prohibited Use
                        </h2>
                        <p className="text-zinc-600 leading-relaxed">
                            You may not use RevLinko to solicit fake reviews, harass customers, or violate any third-party review platform policies (e.g., Google Business Profile policies).
                        </p>
                    </section>

                    <section className="bg-zinc-50 rounded-3xl p-8 border border-zinc-100">
                        <h2 className="text-xl font-bold mb-4">Legal Notice</h2>
                        <p className="text-zinc-600 mb-4">
                            RevLinko is a product of RevLinko Inc. For legal inquiries:
                        </p>
                        <p className="text-zinc-900 font-bold">
                            legal@revlinko.com
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default TermsOfService;
