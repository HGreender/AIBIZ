import React from "react";
import styles from "./ErrorModal.module.scss"; // Create a separate SCSS file for styling

interface ErrorModalProps {
  message: string;
  onClose: () => void;
}

export const ErrorModal: React.FC<ErrorModalProps> = ({ message, onClose }) => {
  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <h2>Error</h2>
        <p>{message}</p>
        <p>Try again</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};
