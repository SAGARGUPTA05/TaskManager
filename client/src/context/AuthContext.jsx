import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();
const BACK_END_URL = "http://localhost:5000"; 

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    () => JSON.parse(localStorage.getItem("user")) || null
  );

  const login = async (email, password) => {
    const res = await axios.post(
      `${BACK_END_URL}/api/auth/login`,
      { email, password },
      { withCredentials: true }
    );
    
    localStorage.setItem("user", JSON.stringify(res.data.user));


    setUser(res.data.user);
  };

  const register = async (data) => {
    const res = await axios.post(`${BACK_END_URL}/api/auth/register`, data, {
      withCredentials: true,
    });
    
    localStorage.setItem("user", JSON.stringify(res.data.user));

    setUser(res.data.user);
  };

  const logout = async () => {
    await axios.post(
      `${BACK_END_URL}/api/auth/logout`,
      {},
      { withCredentials: true }
    );
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
