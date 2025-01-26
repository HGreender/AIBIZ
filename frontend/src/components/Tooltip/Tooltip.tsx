import React, { forwardRef } from "react";
import styles from "./Tooltip.module.scss";

interface TooltipProps {
  visible: boolean;
  onClose: () => void;
}
const content = {
  title: "SMART Goals",
  first_letters: ["S", "M", "A", "R", "T"],
  content: [
    "Specific: Clearly define the goal.",
    "Measurable: Ensure the goal can be measured.",
    "Achievable: Set a realistic goal.",
    "Relevant: Ensure the goal matters to you.",
    "Time-bound: Set a deadline for the goal.",
  ],
};
export const Tooltip = forwardRef<HTMLDivElement, TooltipProps>(
  ({ visible, onClose }, ref) => {
    if (!visible) return null;

    return (
      <div className={styles.tooltip} onClick={onClose}>
        <h3>{content.title}</h3>
        {content.content.map((item, index) => (
          <p key={index + item}>
            <strong>{content.first_letters[index]}</strong>
            {item.slice(1)}
          </p>
        ))}
      </div>
    );
  }
);
