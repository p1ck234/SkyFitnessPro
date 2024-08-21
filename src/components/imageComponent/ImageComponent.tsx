import React, { useEffect, useState } from "react";
import { getFileURL } from "@/services/storageService";

interface ImageComponentProps {
  filePath: string; 
  altText?: string; 
  className?: string; 
  onLoad?: () => void; 
  onError?: () => void; 
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
        if (onError) onError();
      }
    };

    fetchImage();
  }, [filePath, onError]);

  return (
    <div className={`relative ${className}`}>
      {isLoading && <div className="loader"></div>}
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
