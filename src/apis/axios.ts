import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

/* ===================== 토큰 재발급 ===================== */
const requestNewTokens = async () => {
  const refreshToken = localStorage.getItem('refreshToken');
  if (!refreshToken) throw new Error('No refresh token');

  const res = await axios.get(
    `${import.meta.env.VITE_API_BASE_URL}/auth/refresh-token`,
    {
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
    },
  );

  if (!res.data?.isSuccess) {
    throw new Error('Refresh failed');
  }

  const { accessToken, refreshToken: newRefresh } = res.data.result;

  localStorage.setItem('accessToken', accessToken);
  localStorage.setItem('refreshToken', newRefresh);

  return accessToken;
};

/* ===================== 요청 인터셉터 ===================== */
axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('accessToken');

    if (accessToken && config.headers) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

/* ===================== 응답 인터셉터 ===================== */
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // 🔥 401 OR 403 모두 토큰 만료로 간주
    if (
      (error.response?.status === 401 || error.response?.status === 403) &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        const newAccessToken = await requestNewTokens();

        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        }

        return axiosInstance(originalRequest);
      } catch (refreshError) {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
