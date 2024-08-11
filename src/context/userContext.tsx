import React, { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, User as FirebaseUser } from "firebase/auth";
import { auth, getUserData } from "../services/authService"; // Убедитесь, что вы экспортируете auth и getUserData из authService.ts

interface UserContextType {
  user: FirebaseUser | null;
  userData: UserData | null; // Дополнительные данные пользователя
}

interface UserData {
  username: string;
  email: string;
  createdAt: Date;
  // Добавьте любые другие поля, которые вам нужны
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        // Получаем дополнительные данные пользователя из Firestore
        const data = await getUserData(currentUser.uid);
        setUserData(data as UserData);
      } else {
        setUserData(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <UserContext.Provider value={{ user, userData }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
