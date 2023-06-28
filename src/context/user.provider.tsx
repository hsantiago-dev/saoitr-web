import { User } from "@/@core/domain/entities/user";
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

        const obj = localStorage.getItem("user");

        if (obj)
            setUser(JSON.parse(obj));
        else {
            setUser(null);
            localStorage.setItem("user", '{}');
        }
    }, []);

    useEffect(() => {
        if (user)
            localStorage.setItem("user", JSON.stringify(user));
        else
            localStorage.setItem("user", '{}');
    }, [user]);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};