import axios from 'axios';

// const BASE_URL = 'https://review-api-smoky.vercel.app/api';
const BASE_URL = 'http://localhost:5000/api';
// const BASE_URL = 'http://192.168.1.17:5000/api';

const axiosInstance = axios.create({
    baseURL: BASE_URL,
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

const apiRequest = async (endpoint, options = {}) => {
    try {
        const { method = 'GET', body, headers = {} } = options;

        const response = await axiosInstance({
            url: endpoint,
            method,
            data: body,
            headers,
        });
        console.log(response, "response----------------")
        return response.data;
    } catch (error) {
        console.log(error, "error----------------")
        const message = error.response?.data?.message || error.message || 'Something went wrong';
        throw new Error(message);
    }
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
    getMe: () => apiRequest('/auth/me'),
    updateProfile: (userData) => apiRequest('/auth/profile', {
        method: 'PUT',
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
    checkSlug: (slug) => apiRequest(`/business/check-slug/${slug}`),
};
