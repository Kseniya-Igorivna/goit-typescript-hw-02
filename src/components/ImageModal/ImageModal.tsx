import ReactModal from "react-modal";
import styles from "./ImageModal.module.css";

ReactModal.setAppElement("#root");

interface ImageModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  src: string;
  alt: string;
}

export default function ImageModal({
  isOpen,
  onRequestClose,
  src,
  alt,
}: ImageModalProps) {
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Image Modal"
      className={styles.modal}
      overlayClassName={styles.overlay}
      shouldCloseOnOverlayClick={true}
      shouldCloseOnEsc={true}
    >
      <div className={styles.modalContent}>
        <img src={src} alt={alt} className={styles.image} />
      </div>
    </ReactModal>
  );
}
