import React, { useEffect, useState } from "react";
import { getFileURL } from "@/services/storageService";

interface ImageComponentProps {
  filePath: string;
  altText?: string;
  className?: string;
}

export const ImageComponent: React.FC<ImageComponentProps> = ({
  filePath,
  altText = "Image",
  className = "",
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
      } finally {
        setIsLoading(false); // Завершаем загрузку
      }
    };

    fetchImage();
  }, [filePath]);

  return (
    <div className={`relative ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 flex justify-center items-center">
          <div className="loader"></div> {/* Замените на ваш лоадер */}
        </div>
      )}
      {imageUrl && (
        <img
          className={`rounded-3xl ${isLoading ? "opacity-0" : "opacity-100"}`}
          src={imageUrl}
          alt={altText}
          onLoad={() => setIsLoading(false)}
        />
      )}
    </div>
  );
};
