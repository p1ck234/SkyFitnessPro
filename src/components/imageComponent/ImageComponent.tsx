import React, { useEffect, useState } from "react";
import { getFileURL } from "@/services/storageService";

interface ImageComponentProps {
  filePath: string; // Пропс для пути к файлу
  altText?: string; // Пропс для альтернативного текста (опционально)
}

export const ImageComponent: React.FC<ImageComponentProps> = ({
  filePath,
  altText = "Image",
}) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const url = await getFileURL(filePath);
        setImageUrl(url);
      } catch (error) {
        console.error("Error fetching image:", error);
      }
    };

    fetchImage();
  }, [filePath]);

  if (!imageUrl) {
    return <p>Loading...</p>; // Показать лоадер, пока изображение загружается
  }

  return <img className="rounded-3xl" src={imageUrl} alt={altText} />;
};
