// const BASE_URL = 'https://review-api-smoky.vercel.app/api';
const BASE_URL = 'http://localhost:5000/api';

const apiRequest = async (endpoint, options = {}) => {
    const token = localStorage.getItem('token');

    const isFormData = options.body instanceof FormData;

    const headers = {
        ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
        ...options.headers,
    };

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    const config = {
        ...options,
        headers,
        body: isFormData ? options.body : (options.body ? JSON.stringify(options.body) : undefined)
    };

    const response = await fetch(`${BASE_URL}${endpoint}`, config);
    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
    }

    return data;
};

export const api = {
    // Auth
    login: (credentials) => apiRequest('/auth/login', {
        method: 'POST',
        body: credentials,
    }),
    register: (userData) => apiRequest('/auth/register', {
        method: 'POST',
        body: userData,
    }),

    // Business
    createBusiness: (businessData) => apiRequest('/business/create', {
        method: 'POST',
        body: businessData,
    }),
    updateBusiness: (id, businessData) => apiRequest(`/business/${id}`, {
        method: 'PUT',
        body: businessData,
    }),
    getBusinessByIdentifier: (identifier) => apiRequest(`/business/${identifier}`),
    getMyBusiness: () => apiRequest('/business/me'),

    // Reviews
    generateAIReview: (slug) => apiRequest(`/reviews/generate/${slug}`, {
        method: 'POST',
    }),
};
