import React, { createContext, useState, useContext, ReactNode } from "react";

interface AuthContextType {
  isRegistered: boolean;
  isLoggedIn: boolean;
  registerUser: () => void;
  loginUser: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isRegistered, setIsRegistered] = useState<boolean>(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const registerUser = () => {
    setIsRegistered(true); // Mark user as registered
    setIsLoggedIn(true);
  };

  const loginUser = () => {
    setIsRegistered(true);
    setIsLoggedIn(true); // Mark user as logged in
  };

  return (
    <AuthContext.Provider
      value={{ isRegistered, isLoggedIn, registerUser, loginUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};
