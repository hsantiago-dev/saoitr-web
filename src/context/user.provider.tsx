import { User } from "@/core/entities/user";
import { PropsWithChildren, createContext, useEffect, useState } from "react";

export type UserContextType = {
    user: User | null;
    setUser: (user: User | null) => void;
};

const defaultContext: UserContextType = {
    user: null,
    setUser: () => {},
};

export const UserContext = createContext(defaultContext);

export const UserProvider = ({ children }: PropsWithChildren) => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {

        const user = localStorage.getItem("user") || '{}';
        
        if (user !== '{}') 
            setUser(JSON.parse(user));
        else 
            setUser(null);
    }, []);

    useEffect(() => {
        if (user) {
            localStorage.setItem("user", JSON.stringify(user));
        } else {
            localStorage.removeItem("user");
        }
    }, [user]);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};