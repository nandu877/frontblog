import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext(null);


export const AuthContextProvider = ({ children }) => {
    const navigate = useNavigate()
    const [isLogin, setIsLogin] = useState(() => !!localStorage.getItem("token"));
    const [role, setRole] = useState(() => {
        const storedUser = localStorage.getItem("user");
        return storedUser ? JSON.parse(storedUser).role : null;
    });

    const login = (token, user) => {
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));

        setIsLogin(true);
        setRole(user?.role);

        if (user?.role === "ADMIN") navigate("/admin");
        else navigate("/author");
    }

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user")
        window.location.href = "/login";
    }
    return (
        <AuthContext.Provider value={{ isLogin, role, login,logout }}>
            {children}
        </AuthContext.Provider>
    )
}