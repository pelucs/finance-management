import { createContext, ReactNode, useEffect, useState } from "react";
import { auth } from '../libs/firebase';

interface AuthProvider{
  children: ReactNode;
}

export const AuthContext = createContext<any>(null);

export const AuthContextProvider = ({ children }: AuthProvider) => {

  const [user, setUser] = useState<any>(null);

  useEffect(() => {

    auth.onAuthStateChanged(AuthUser => {
      setUser(AuthUser);
    })

  }, []);

  return(
    <AuthContext.Provider value={ user }>
      {children}
    </AuthContext.Provider>
  )
}