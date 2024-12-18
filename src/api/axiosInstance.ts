import axios, { AxiosResponse } from 'axios';
import { BACKEND_URL } from '../constants/backend';

console.log("BACKEND_URL ", BACKEND_URL)

const axiosInstance = axios.create({
  baseURL: BACKEND_URL,
});

let accessToken: string | null = null;
let refreshToken: string | null = null;

let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom: any) => {
    if (error) prom.reject(error);
    else prom.resolve(token);
  });

  failedQueue = [];
};

export const setAccessToken = (newAccessToken: string) => {
  accessToken = newAccessToken;
};

export const setRefreshToken = (newRefreshToken: string) => {
  refreshToken = newRefreshToken;
};

// ** Request Interceptor: Attach access token to all requests **
axiosInstance.interceptors.request.use(
  (config) => {
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ** Response Interceptor: Handle 401 and refresh token **
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error) => {
    const originalRequest = error.config;

    // Check if error is 401 and we haven't already refreshed the token
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (!refreshToken) {
        console.error('Refresh token is missing');
        return Promise.reject(error);
      }

      if (isRefreshing) {
        // Queue failed requests while token is being refreshed
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers['Authorization'] = `Bearer ${token}`;
            return axiosInstance(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        let response;

        try {
          response = await axios.post(`${BACKEND_URL}/api/identity/auth/refresh-token`, {
            token: refreshToken,
          });
        } catch (firstError) {
          console.warn('First refresh attempt failed:', firstError);
          response = await axios.post(`${BACKEND_URL}/api/brands/auth/refresh-token`, {
            token: refreshToken,
          });
        }

        if (response.status !== 200 || !response.data.accessToken) {
            console.error('Invalid refresh token or failed to get new access token.');
            return Promise.reject('Unable to refresh token');
          }

        const { accessToken } = response.data;
        setAccessToken(accessToken);
        // Process the queued requests
        processQueue(null, accessToken);

        // Retry the original request with the new access token
        originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        console.error('Both refresh attempts failed:', refreshError);
        processQueue(refreshError, null);
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
