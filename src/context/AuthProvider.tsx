import {createContext, useState} from "react";

interface AuthContextType {
    auth: {
        user?: any;
        [key: string]: any;
    };
    setAuth: (auth: AuthContextType['auth']) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);


interface UserInfo {
    // ... define user properties here
    name?: number;
    lastName?: string;
    email?: string;
    phoneNumber?: string;
    province?: string;
    city?: string;
    address?: string;

    [key: string]: any; // Index signature

    // add other properties as needed
}

interface AuthState {
    userInfo: UserInfo | null;
    accessToken: string | null;

    [key: string]: any; // Index signature
}

// If you have a default state, define it
// const defaultAuthState: AuthState = {
//     userInfo: null,
//     accessToken: null
// };


export const AuthProvider = ({children}) => {
    // const [auth, setAuth] = useState({});
    const [auth, setAuth] = useState<AuthState>(() => {
        // Load authentication data from local storage or a default value
        const storedAuth = localStorage.getItem("3319173716");
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return storedAuth ? JSON.parse(storedAuth) : {};
    });
    return (
        <AuthContext.Provider value={{auth, setAuth}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;