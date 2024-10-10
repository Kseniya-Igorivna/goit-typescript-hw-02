import styles from "./ImageCard.module.css";

interface ImageCardProps {
  src: string;
  alt: string;
  onClick: () => void;
}

export default function ImageCard({ src, alt, onClick }: ImageCardProps) {
  return (
    <div className={styles.card}>
      <img src={src} alt={alt} className={styles.image} onClick={onClick} />
    </div>
  );
}
