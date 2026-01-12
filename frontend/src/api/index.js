const BASE_URL = 'https://review-api-smoky.vercel.app/api';
// const BASE_URL = 'http://localhost:5000/api';

const apiRequest = async (endpoint, options = {}) => {
    const token = localStorage.getItem('token');
    console.log(token, "token");

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

    // Better handling for non-JSON responses (like 404 HTML pages)
    const contentType = response.headers.get("content-type");
    let data;
    if (contentType && contentType.includes("application/json")) {
        data = await response.json();
    } else {
        const text = await response.text();
        data = { message: text || response.statusText };
    }

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
    sendOTP: (email) => apiRequest('/auth/send-otp', {
        method: 'POST',
        body: { email },
    }),
    verifyOTP: (email, otp) => apiRequest('/auth/verify-otp', {
        method: 'POST',
        body: { email, otp },
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
    checkSlug: (slug) => apiRequest(`/business/check-slug/${slug}`),
};
