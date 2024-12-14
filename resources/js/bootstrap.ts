import axios from "axios";

// Attach Axios to the global `window` object to make it accessible throughout the application
window.axios = axios;

// Set a default header for Axios requests to indicate that they are AJAX requests
// This helps the server recognize the request type, especially for CSRF protection
window.axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
