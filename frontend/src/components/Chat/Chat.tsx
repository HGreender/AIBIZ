"use client";

import { useState } from "react";
import { useSendMessageMutation } from "@/store/services/chatApi";
import { ChatMessage } from "@/store/services/chatApi";
import styles from "./Chat.module.scss";

export const Chat = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [sendMessage] = useSendMessageMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content: message,
      role: "user",
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setMessage("");

    try {
      const response = await sendMessage(message).unwrap();
      setMessages((prev) => [...prev, response]);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className={styles.chat}>
      <header className={styles.header}>
        <h1>Make SMART goals</h1>
      </header>

      <div className={styles.messages}>
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`${styles.message} ${
              msg.role === "user" ? styles.userMessage : styles.assistantMessage
            }`}
          >
            {msg.content}
          </div>
        ))}
      </div>

      <form className={styles.inputPanel} onSubmit={handleSubmit}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your goal here..."
          className={styles.input}
        />
        <button type="submit" className={styles.sendButton}>
          ↑
        </button>
      </form>
    </div>
  );
};
