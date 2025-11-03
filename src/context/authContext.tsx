import { createContext, useState, useEffect } from "react";
import type { ReactNode } from "react";


// interface för hur user ska se ut
interface User {
    id: string,
    email: string
};


interface AuthContextType {
    user: User | null;
    isLoggedIn: boolean;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    register: (email: string, password: string, name: string) => Promise<void>;
}

// detta skapar contexted, och jag skickar med deafult värderna av vad 
// contexted ska inegållla.
export const AuthContext = createContext<AuthContextType>({
    user: null,
    isLoggedIn: false,
    login: async () => {},
    logout: async () => {},
    register: async () => {},
})

// authprovider kommer att wrappa andra compontenter 
//children blir då allt som är mellan <AuthProvider> <App /> </AuthProvider>
export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const isLoggedIn = !!user;

    // kolla om user redan är inloggad när komponenten mountas
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await fetch(`${import.meta.env.VITE_API_URL}/me`, {
                    credentials: "include",
                });
                if (res.ok) {
                    const data = await res.json();
                    setUser(data);
                } else {
                    setUser(null);
                }
            } catch (err) {
                setUser(null);
            }
        };
        fetchUser();
    }, [])

    // login user 
    const login = async (email: string, password: string) => {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include", 
            body: JSON.stringify({ email, password }),
        });

        if (!res.ok) throw new Error("Login Failed")

        const data = await res.json();
        setUser(data)

    }
    // logout users
    const logout = async () => {
        try {
            await fetch(`${import.meta.env.VITE_API_URL}/auth/logout`, {
                method: "POST",
                credentials: "include"
            });
            setUser(null);
        } catch (error) {
            console.error("Logout failed", error)
        }
    }

    // register users
   const register = async (email: string, password: string, name: string) => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({email, password, name})
    });
    if(!res.ok) throw new Error("Registration failed")
    const data = await res.json()
    console.log("Resgistered user:", data)
   }

    return (
        <AuthContext.Provider value={{ user, isLoggedIn, login, logout, register }}>
            {children}
        </AuthContext.Provider>

    )

}