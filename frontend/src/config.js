// On Vercel (production), VITE_API_URL must be set to your Render backend URL.
// Example: https://travel-system-backend-xxxx.onrender.com/api
// On localhost (development), falls back to the local PHP backend.
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost/travel-business-system/php-backend/api';

export default API_URL;

