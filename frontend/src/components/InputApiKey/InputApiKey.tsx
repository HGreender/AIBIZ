import React, { useState, forwardRef } from "react";
import styles from "./InputApiKey.module.scss";

interface InputApiKeyProps {
  visible: boolean;
  onClose: () => void;
}

export const InputApiKey = forwardRef<HTMLDivElement, InputApiKeyProps>(
  ({ visible, onClose }, ref) => {
    const [apiKey, setApiKey] = useState<string>("");
    const handleApiKeySubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (apiKey.trim()) {
        localStorage.setItem("OPENAI_API_KEY", apiKey);
        onClose();
      }
    };

    if (!visible) return null;

    return (
      <form className={styles.inputPanel} onSubmit={handleApiKeySubmit}>
        <div>
          <input
            type="text"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="Enter your OpenAI API key... sk-or-..."
            className={styles.input}
          />
          <button type="submit" className={styles.saveButton}>
            Save Key
          </button>
        </div>
        <p>Click on 'Save Key' button and reload the page</p>
      </form>
    );
  }
);
