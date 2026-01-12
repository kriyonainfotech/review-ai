import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { api } from '../api';
import PreviewProfile from '../components/profile/PreviewProfile';

const LinkInBioPage = () => {
    const { id: slug } = useParams();
    const [business, setBusiness] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchBusiness = async () => {
            try {
                const data = await api.getBusinessByIdentifier(slug);
                setBusiness(data);
            } catch (err) {
                setError('Page not found');
            } finally {
                setLoading(false);
            }
        };

        if (slug) fetchBusiness();
    }, [slug]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center p-6 bg-zinc-50">
                <Loader2 size={40} className="animate-spin text-primary-600" />
            </div>
        );
    }

    if (error || !business) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-zinc-50 text-center text-zinc-900">
                <h1 className="text-2xl font-bold mb-2">Page Not Found</h1>
                <p className="text-zinc-500">The business profile you are looking for doesn't exist.</p>
            </div>
        );
    }

    return <PreviewProfile business={business} />;
};

export default LinkInBioPage;

