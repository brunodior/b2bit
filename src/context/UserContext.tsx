import { createContext } from "react";
import useAuth from "../hooks/useAuth";


interface AuthContextType {
    login: (user: any) => void;
    checkAuth: () => void;
    getUser: () => any;
    logout: () => void;
}

const Context = createContext<AuthContextType | null>(null);

function UserProvider({ children }: { children: React.ReactNode }) {
    const { login, checkAuth, getUser, logout } = useAuth();

    return (
        <Context.Provider value={{ login, checkAuth, getUser, logout }}>
            {children}
        </Context.Provider>
    );
}

export { Context, UserProvider };
