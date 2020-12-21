import React, { createContext, useCallback, useContext, useState } from "react";
import { auth, database } from "../firebase";

interface AuthState {
  user: object;
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  user: object;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const rootRef = database.ref();
const adminRef = rootRef.child("adminAccess");

const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const user = localStorage.getItem("@Phovi:user");

    if (user) {
      return { user: JSON.parse(user) };
    }

    return {} as AuthState;
  });

  const signIn = useCallback(async ({ email, password }) => {
    const user = {};

    await auth
      .signInWithEmailAndPassword(email, password)
      .then(async (userData) => {
        localStorage.setItem("@Phovi:user", JSON.stringify(userData));
        setData({ user });
        adminRef.push().update({
          "uid" : userData.user?.uid,
          "timestamp" : Date.now()
        });
      })
      .catch((error) => alert(error));
      
  }, []);

  const signOut = useCallback(async () => {
    await auth.signOut();
    localStorage.removeItem("@Phovi:user");

    setData({} as AuthState);
  }, []);

  return (
    <AuthContext.Provider value={{ user: data.user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}

export { AuthProvider, useAuth };
