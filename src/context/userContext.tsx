import React, { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, User as FirebaseUser } from "firebase/auth";
import { auth, getUserData } from "../services/authService";
import { useDispatch } from "react-redux";
import { login, logout } from "../store/slices/authSlice";

interface UserContextType {
  user: FirebaseUser | null;
  userData: UserData | null;
  loading: boolean; // Новое состояние для отслеживания загрузки
}

interface UserData {
  username: string;
  email: string;
  createdAt: Date;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true); // Изначально true, пока идет проверка
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        const data = await getUserData(currentUser.uid);
        setUserData(data as UserData);
        dispatch(login(currentUser.uid));
      } else {
        setUser(null);
        setUserData(null);
        dispatch(logout());
      }
      setLoading(false); // Проверка завершена
    });

    return () => unsubscribe();
  }, [dispatch]);

  if (loading) {
    return (
      <div className="container-loader">
        <div className="loader"></div>
      </div>
    ); // Показать индикатор загрузки
  }

  return (
    <UserContext.Provider value={{ user, userData, loading }}>
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
