import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
} from "firebase/auth";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../firebaseConfig";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";

// Инициализация Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export const register = async (email: string, password: string, username: string): Promise<{ user: { uid: string }; token: string }> => {
  try {
    function validateEmail(email: string): boolean {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(String(email).toLowerCase());
    }
    
    if (!validateEmail(email)) {
      throw new Error("Invalid email format");
    }
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    await setDoc(doc(db, "users", user.uid), {
      username,
      email: user.email,
      createdAt: new Date(),
    });
    const token = await user.getIdToken();
    return { user: { uid: user.uid }, token }; // Убедитесь, что возвращается объект с user.uid
  } catch (error: any) {
    console.error("Error during registration:", error);
    throw error;
  }
};

export const login = async (email: string, password: string): Promise<{ token: string; userId: string }> => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    const token = await user.getIdToken();
    return { token, userId: user.uid }; // Изменено на возвращение userId
  } catch (error: any) {
    console.error("Error during login:", error);
    throw error;
  }
};

// Функция для восстановления пароля
export const resetPassword = async (email: string) => {
  try {
    await sendPasswordResetEmail(auth, email);
    console.log("Password reset email sent!");
  } catch (error) {
    console.error("Error during password reset:", error);
    throw error;
  }
};

export const logout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Error during logout:", error);
    throw error;
  }
};


// Функция для получения данных пользователя из Firestore
export const getUserData = async (uid: string) => {
  try {
    const userDoc = await getDoc(doc(db, "users", uid));
    if (userDoc.exists()) {
      return userDoc.data();
    } else {
      console.error("No such user!");
      return null;
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};

export { auth };
