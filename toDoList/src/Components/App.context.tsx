import { createContext, useState } from "react";
import { AuthContextType } from "../Interfaces/AuthContext"
import { AuthProviderProps } from "../Interfaces/AuthProviderProps";


export const AuthContext = createContext<AuthContextType>({
    loggedInEmail: null,
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    setLoggedInEmail: () => {},
});

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [loggedInEmail, setLoggedInEmail] = useState<string | null>(null);
  
    // console.log(loggedInEmail)
    return (
      <AuthContext.Provider value={{ loggedInEmail, setLoggedInEmail }}>
        {children}
      </AuthContext.Provider>
    );
  };