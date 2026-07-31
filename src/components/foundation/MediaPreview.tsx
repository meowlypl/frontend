import { useEffect, useState } from "react";
import type { AnimalMedia } from "../../types/Animal";

type MediaPreviewProps = {
  media: AnimalMedia;
  className?: string;
  controls?: boolean;
};

export default function MediaPreview({
  media,
  className = "",
  controls = true,
}: MediaPreviewProps) {
  const [source, setSource] = useState("");

  useEffect(() => {
    const objectUrl = URL.createObjectURL(media.blob);

    setSource(objectUrl);

    return () => {
      URL.revokeObjectURL(objectUrl);
    };
  }, [media.blob]);

  if (!source) {
    return (
      <div
        className={`animate-pulse bg-light-overlay dark:bg-overlay ${className}`}
      />
    );
  }

  if (media.type === "video") {
    return (
      <video
        src={source}
        className={className}
        controls={controls}
        preload="metadata"
      >
        Twoja przeglądarka nie obsługuje filmów.
      </video>
    );
  }

  return (
    <img
      src={source}
      alt={media.name}
      className={className}
    />
  );
}