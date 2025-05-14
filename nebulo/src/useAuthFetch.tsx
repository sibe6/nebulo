import { useAuth } from './AuthContext';

export const useAuthFetch = () => {
  const { token, logout } = useAuth();

  const authFetch = async (url: string, options: RequestInit = {}) => {
    const headers = {
      ...options.headers,
      Authorization: `Bearer ${token}`,
    };

    const response = await fetch(url, { ...options, headers });

    if (response.status === 401 || response.status === 403) {
      try {
        const data = await response.json();
        if (data.message?.includes("Invalid token")) {
          console.error(`Auth error: ${data.message}`);
        }
      } catch (err) {
        console.error("Error parsing response:", err);
      }

      logout();
      throw new Error("Unauthorized: Logging out");
    }

    return response;
  };

  return authFetch;
};