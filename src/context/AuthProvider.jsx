import { useContext, useEffect, useState } from "react";
import { createContext } from "react";
import { login, logout, onAuthChanged } from "../api/firebase";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState();

  useEffect(() => {
    onAuthChanged(setUser);
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, uid: user && user.uid, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  return useContext(AuthContext);
}
