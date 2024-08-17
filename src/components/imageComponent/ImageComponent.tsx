import React, { useEffect, useState } from "react";
import { getFileURL } from "@/services/storageService";

interface ImageComponentProps {
  filePath: string; // Пропс для пути к файлу
  altText?: string; // Пропс для альтернативного текста (опционально)
  className?: string; // Пропс для дополнительных классов
  onLoad?: () => void; // Пропс для обработки события загрузки изображения
  onError?: () => void; // Пропс для обработки ошибки загрузки изображения
}

export const ImageComponent: React.FC<ImageComponentProps> = ({
  filePath,
  altText = "Image",
  className = "",
  onLoad,
  onError,
}) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true); // Добавляем состояние загрузки

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const url = await getFileURL(filePath);
        setImageUrl(url);
      } catch (error) {
        console.error("Error fetching image:", error);
        if (onError) onError();
      }
    };

    fetchImage();
  }, [filePath, onError]);

  return (
    <div className={`relative ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 flex justify-center items-center">
          <div className="loader"></div>
        </div>
      )}
      {imageUrl && (
        <img
          className={`w-full rounded-3xl ${
            isLoading ? "opacity-0" : "opacity-100"
          }`}
          src={imageUrl}
          alt={altText}
          onLoad={() => {
            setIsLoading(false);
            if (onLoad) onLoad();
          }}
          onError={() => {
            setIsLoading(false);
            if (onError) onError();
          }}
        />
      )}
    </div>
  );
};
