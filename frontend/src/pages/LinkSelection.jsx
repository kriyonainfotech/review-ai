import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import {
    MessageCircle,
    Globe,
    Instagram,
    Facebook,
    Star,
    MapPin,
    Phone,
    Mail,
    ChevronLeft,
    ChevronRight,
    Check, Sparkles
} from 'lucide-react';

const LinkSelection = () => {
    const [selected, setSelected] = useState(['Google Review']);
    const navigate = useNavigate();

    const links = [
        { id: 'whatsapp', label: 'WhatsApp', icon: MessageCircle, color: 'text-emerald-500', bg: 'bg-emerald-50' },
        { id: 'website', label: 'Website', icon: Globe, color: 'text-blue-500', bg: 'bg-blue-50' },
        { id: 'instagram', label: 'Instagram', icon: Instagram, color: 'text-pink-500', bg: 'bg-pink-50' },
        { id: 'facebook', label: 'Facebook', icon: Facebook, color: 'text-blue-600', bg: 'bg-blue-50' },
        { id: 'google_review', label: 'Google Review', icon: Star, color: 'text-amber-500', bg: 'bg-amber-50' },
        { id: 'google_maps', label: 'Google Maps', icon: MapPin, color: 'text-red-500', bg: 'bg-red-50' },
        { id: 'call', label: 'Call', icon: Phone, color: 'text-green-600', bg: 'bg-green-50' },
        { id: 'email', label: 'Email', icon: Mail, color: 'text-indigo-500', bg: 'bg-indigo-50' }
    ];

    const toggleLink = (label) => {
        setSelected(prev =>
            prev.includes(label) ? prev.filter(l => l !== label) : [...prev, label]
        );
    };

    return (
        <div className="p-8 lg:p-12 max-w-4xl mx-auto animate-fade-in-up">
            <header className="mb-10">
                <div className="flex items-center gap-2 text-sm font-bold text-zinc-400 uppercase tracking-widest mb-4">
                    <span>Dashboard</span>
                    <ChevronRight size={14} />
                    <span className="text-primary-600">Review Links</span>
                </div>
                <h1 className="text-4xl font-extrabold text-zinc-900 tracking-tight mb-3">Select your Profile Links</h1>
                <p className="text-zinc-500 font-medium text-lg">Choose which contact methods and social profiles you want to show on your Bio page.</p>

                <div className="flex gap-2 mt-8">
                    <div className="h-1.5 flex-1 bg-primary-600 rounded-full shadow-sm shadow-primary-500/20"></div>
                    <div className="h-1.5 flex-1 bg-primary-600 rounded-full shadow-sm shadow-primary-500/20"></div>
                    <div className="h-1.5 flex-1 bg-zinc-200 rounded-full"></div>
                </div>
                <div className="flex justify-between items-center mt-3">
                    <span className="text-xs font-bold text-primary-600 uppercase tracking-widest">Step 2 of 3</span>
                    <span className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Link Configuration</span>
                </div>
            </header>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-10">
                {links.map((link) => (
                    <button
                        key={link.id}
                        onClick={() => toggleLink(link.label)}
                        className={`
                            relative p-8 rounded-[2rem] border-2 transition-all duration-300 flex flex-col items-center gap-4 group
                            ${selected.includes(link.label)
                                ? 'border-primary-600 bg-primary-50/30 ring-4 ring-primary-50 shadow-lg'
                                : 'border-zinc-100 bg-white hover:border-zinc-200 hover:shadow-md'}
                        `}
                    >
                        <div className={`w-16 h-16 ${link.bg} ${link.color} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
                            <link.icon size={32} />
                        </div>
                        <span className={`text-sm font-bold uppercase tracking-widest ${selected.includes(link.label) ? 'text-primary-600' : 'text-zinc-500'}`}>
                            {link.label}
                        </span>
                        {selected.includes(link.label) && (
                            <div className="absolute top-4 right-4 w-6 h-6 bg-primary-600 text-white rounded-full flex items-center justify-center shadow-md">
                                <Check size={14} strokeWidth={4} />
                            </div>
                        )}
                    </button>
                ))}
            </div>

            <div className="flex justify-between items-center pt-10 border-t border-zinc-100">
                <Button variant="secondary" className="px-8 h-12" icon={ChevronLeft} onClick={() => navigate('/create-business')}>
                    Back
                </Button>
                <Button size="lg" className="px-10 h-14 shadow-xl shadow-primary-500/20" icon={Sparkles} onClick={() => navigate('/r/demo')}>
                    Generate Review Page
                </Button>
            </div>
        </div>
    );
};

export default LinkSelection;
