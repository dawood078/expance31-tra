import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [error, setError] = useState(null);

    const BASE_URL = process.env.REACT_APP_BASE_URL || "https://expance31-backend.onrender.com/api/v1/";

    useEffect(() => {
        const checkCurrentUser = async () => {
            if (token) {
                try {
                    const res = await axios.get(`${BASE_URL}get-user`, { withCredentials: true });
                    setUser(res.data);
                } catch (err) {
                    console.error("Error fetching user", err);
                    // If error (e.g. invalid token), clear state
                    setUser(null);
                    setToken(null);
                    localStorage.removeItem('token');
                }
            }
        }
        checkCurrentUser();
    }, [token])

    const register = async (userData) => {
        try {
            setError(null);
            const res = await axios.post(`${BASE_URL}register`, userData, { withCredentials: true });
            return res.data;
        } catch (err) {
            setError(err.response.data.message);
        }
    };

    const login = async (userData) => {
        try {
            setError(null);
            const res = await axios.post(`${BASE_URL}login`, userData, { withCredentials: true });
            setToken(res.data.token);
            setUser(res.data.user);
            localStorage.setItem('token', res.data.token);
            return res.data;
        } catch (err) {
            setError(err.response.data.message);
        }
    };

    const logout = async () => {
        try {
            await axios.post(`${BASE_URL}logout`, {}, { withCredentials: true });
            setToken(null);
            setUser(null);
            localStorage.removeItem('token');
        } catch (err) {
            console.error(err);
        }
    };

    const forgotPassword = async (email) => {
        try {
            setError(null);
            const res = await axios.post(`${BASE_URL}forgot-password`, { email });
            return res.data;
        } catch (err) {
            setError(err.response.data.message);
            return null;
        }
    };

    const resetPassword = async (token, password) => {
        try {
            setError(null);
            const res = await axios.put(`${BASE_URL}reset-password/${token}`, { password });
            return res.data;
        } catch (err) {
            setError(err.response.data.message);
            return null;
        }
    };

    return (
        <AuthContext.Provider value={{ user, token, register, login, logout, forgotPassword, resetPassword, error }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuthContext = () => {
    return useContext(AuthContext);
};
