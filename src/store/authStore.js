import { create } from "zustand";

const useAuthStore = create((set) => ({
    isAuthenticated: false,
    accessToken: localStorage.getItem("accessToken") || null,
    refreshToken: localStorage.getItem("refreshToken") || null,
    user: JSON.parse(localStorage.getItem("user") || "null"), // undefined 방지
    setAccessToken: (token) => {
        if (token) {
            localStorage.setItem("accessToken", token);
        } else {
            localStorage.removeItem("accessToken");
        }
        set({ isAuthenticated: !!token, accessToken: token });
    },
    setRefreshToken: (token) => {
        if (token) {
            localStorage.setItem("refreshToken", token);
        } else {
            localStorage.removeItem("refreshToken");
        }
        set({ refreshToken: token });
    },
    setUser: (user) => {
        if (user) {
            localStorage.setItem("user", JSON.stringify(user));
        } else {
            localStorage.removeItem("user");
        }
        set({ user });
    },
    logout: () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("user");
        set({
            isAuthenticated: false,
            accessToken: null,
            refreshToken: null,
            user: null,
        });
    },
}));

export default useAuthStore;
