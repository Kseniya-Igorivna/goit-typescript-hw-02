import ImageCard from "../ImageCard/ImageCard";
import styles from "./ImageGallery.module.css";

interface Image {
  id: string;
  urls: {
    small: string;
    regular: string;
  };
  alt_description: string;
}

interface ImageGalleryProps {
  images: Image[];
  onImageClick: (src: string, alt: string) => void;
}

export default function ImageGallery({
  images,
  onImageClick,
}: ImageGalleryProps) {
  return (
    <ul className={styles.gallery}>
      {images.map(image => (
        <li
          key={image.id}
          onClick={() =>
            onImageClick(image.urls.regular, image.alt_description)
          }
        >
          <ImageCard
            src={image.urls.small}
            alt={image.alt_description}
            onClick={() =>
              onImageClick(image.urls.regular, image.alt_description)
            }
          />
        </li>
      ))}
    </ul>
  );
}
