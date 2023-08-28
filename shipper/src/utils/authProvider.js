import { createContext, useContext, useState } from "react";
import { login } from "../api/fetchers/user";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("shipper")));

  const loginUser = async (formData) => {
    const { data } = await login(formData);
    if (data.status === "OK") {
      setUser(data.data);
    }
    return data;
  };

  const logoutUser = () => {
    localStorage.removeItem("shipper");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ loginUser, logoutUser, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
