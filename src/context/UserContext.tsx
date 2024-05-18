import { createContext, useContext } from "react";
import useAuth from "../hooks/useAuth";


interface AuthContextType {
    login: (user: any) => void;
    checkAuth: () => void;
    getUser: () => any;
    logout: () => void;
}

const initialState = {
    login: () => undefined,
    checkAuth: () => undefined,
    getUser: () => undefined,
    logout: () => undefined,

}

const Context = createContext<AuthContextType | null>(initialState);

export function UserProvider({ children }: { children: React.ReactNode }) {
    const { login, checkAuth, getUser, logout } = useAuth();

    return (
        <Context.Provider value={{ login, checkAuth, getUser, logout }}>
            {children}
        </Context.Provider>
    );
}


const useMyContext = () => {
    const context = useContext(Context)
  
    if (!context) {
        throw new Error("MyComponent must be used within a UserProvider");
    }
    return context
}
  

export default useMyContext;
