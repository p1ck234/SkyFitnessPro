import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../firebaseConfig";

export const getFileURL = async (filePath: string): Promise<string> => {
  try {
    const storageRef = ref(storage, filePath);
    const url = await getDownloadURL(storageRef);
    return url;
  } catch (error) {
    console.error("Error getting file URL:", error);
    throw error;
  }
};
