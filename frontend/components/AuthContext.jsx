import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userData,setUserData]=useState({})
    const [admin,setAdmin]=useState(false)

    useEffect(() => {
        const checkSession = async () => {
            try {
                const res = await fetch("/auth/check", {
                method: "POST",
                credentials: "include",
                });
                const data=await res.json()
                if (res.ok) {
                    setIsLoggedIn(true);
                    setUserData(data.user)
                    if(data.user.rol=="admin"){
                        setAdmin(true)
                    }
                } else {
                    setIsLoggedIn(false);
                }
            } catch (err) {
                console.error("Auth check failed:", err);
                setIsLoggedIn(false);
            }
        };
        checkSession();
    }, []);

    useEffect(() => {
        localStorage.setItem("isLoggedIn", isLoggedIn.toString());
    }, [isLoggedIn]);

    return (
        <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn , userData , admin}}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
