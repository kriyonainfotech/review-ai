import React from 'react';
import { Shield, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const PrivacyPolicy = () => {
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
                        <Shield size={24} fill="currentColor" />
                        <span className="font-black tracking-tight">RevLinko Legal</span>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-3xl mx-auto px-6 py-16">
                <h1 className="text-4xl lg:text-5xl font-black mb-4 tracking-tight">Privacy Policy</h1>
                <p className="text-zinc-500 mb-12 font-medium">Last Updated: January 22, 2026</p>

                <div className="prose prose-zinc max-w-none space-y-12">
                    <section>
                        <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                            <span className="w-8 h-8 rounded-lg bg-primary-100 text-primary-600 flex items-center justify-center text-sm font-black">1</span>
                            Introduction
                        </h2>
                        <p className="text-zinc-600 leading-relaxed text-lg">
                            At RevLinko, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our platform.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                            <span className="w-8 h-8 rounded-lg bg-primary-100 text-primary-600 flex items-center justify-center text-sm font-black">2</span>
                            Information We Collect
                        </h2>
                        <p className="text-zinc-600 leading-relaxed mb-4">
                            We collect information that you provide directly to us, such as when you create an account, create a business profile, or communicate with us.
                        </p>
                        <ul className="list-disc pl-6 text-zinc-600 space-y-2">
                            <li>Name and contact information</li>
                            <li>Business details and review profiles</li>
                            <li>Payment information (processed securely via Stripe)</li>
                            <li>Communication preferences</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                            <span className="w-8 h-8 rounded-lg bg-primary-100 text-primary-600 flex items-center justify-center text-sm font-black">3</span>
                            How We Use Your Information
                        </h2>
                        <p className="text-zinc-600 leading-relaxed">
                            We use the information we collect to operate and improve our services, communicate with you, and personalize your experience. This includes generating review links, tracking conversions, and providing AI-powered response suggestions.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                            <span className="w-8 h-8 rounded-lg bg-primary-100 text-primary-600 flex items-center justify-center text-sm font-black">4</span>
                            Data Security
                        </h2>
                        <p className="text-zinc-600 leading-relaxed">
                            We implement industry-standard security measures to protect your data. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.
                        </p>
                    </section>

                    <section className="bg-zinc-50 rounded-3xl p-8 border border-zinc-100">
                        <h2 className="text-xl font-bold mb-4">Contact Us</h2>
                        <p className="text-zinc-600 mb-4">
                            If you have any questions about this Privacy Policy, please contact our legal team:
                        </p>
                        <a href="mailto:legal@revlinko.com" className="text-primary-600 font-bold hover:underline">
                            legal@revlinko.com
                        </a>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
