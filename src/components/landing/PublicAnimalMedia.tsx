import { useEffect, useState } from "react";
import type { AnimalMedia } from "../../types/Animal";

type PublicAnimalMediaProps = {
  media: AnimalMedia;
  alt: string;
  className?: string;
  controls?: boolean;
};

export default function PublicAnimalMedia({
  media,
  alt,
  className = "",
  controls = false,
}: PublicAnimalMediaProps) {
  const [source, setSource] = useState("");

  useEffect(() => {
    const objectUrl = URL.createObjectURL(media.blob);
    setSource(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [media.blob]);

  if (!source) {
    return <div aria-hidden="true" className={`animate-pulse bg-light-overlay dark:bg-overlay ${className}`} />;
  }

  if (media.type === "video") {
    return (
      <video
        src={source}
        aria-label={alt}
        className={className}
        controls={controls}
        preload="metadata"
      />
    );
  }

  return <img src={source} alt={alt} className={className} />;
}
