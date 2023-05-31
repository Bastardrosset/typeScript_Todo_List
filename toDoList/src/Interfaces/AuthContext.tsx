export interface AuthContextType {
    loggedInEmail: string | null;
    setLoggedInEmail: (email: string | null) => void;
  }