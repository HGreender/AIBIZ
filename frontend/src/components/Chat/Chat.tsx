"use client";

import { useState, useEffect } from "react";
import { useSendMessageMutation } from "@/store/services/chatApi";
import { ChatMessage } from "@/store/services/chatApi";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import styles from "./Chat.module.scss";

export const Chat = () => {
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [sendMessage] = useSendMessageMutation();

  // Load messages from localStorage after component mounts
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedMessages = localStorage.getItem("chatMessages");
      if (savedMessages) {
        setMessages(JSON.parse(savedMessages));
      }
    }
  }, []);

  // Save messages to localStorage whenever they change
  useEffect(() => {
    if (messages.length !== 0) {
      localStorage.setItem("chatMessages", JSON.stringify(messages));
    }
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content: message,
      role: "user",
      timestamp: Date.now(),
      choices: undefined,
    };

    setMessages((prev) => [...prev, userMessage]);
    setMessage("");
    setIsLoading(true);

    // Function to parse input string into an object
    function parseInput(input: string) {
      const lines = input.trim().split("\n");
      interface ParsedResult {
        not_smart?: string[];
        suggestions?: string[];
      }
      const result: ParsedResult = {}; // Define the type of result

      lines.forEach((line) => {
        if (line.startsWith("not_smart:")) {
          result.not_smart = line
            .replace("not_smart:", "")
            .trim()
            .split(",")
            .map((item) => item.trim());
        } else if (line.startsWith("suggestions:")) {
          result.suggestions = lines
            .slice(lines.indexOf(line) + 1)
            .map((item) => item.trim())
            .filter((item) => item);
        }
      });
      console.log(result);
      return result;
    }

    try {
      const response = await sendMessage(message).unwrap();
      const parsedObject = parseInput(response.choices[0].message.content);

      const assistantMessages: ChatMessage[] =
        parsedObject.suggestions?.map((suggestion: string, index: number) => ({
          id: Date.now().toString() + index.toString(), // Ensure unique IDs as strings
          role: "assistant",
          content: suggestion,
          choices: undefined,
          timestamp: Date.now(),
        })) || []; // Provide a default value of an empty array if suggestions is undefined

      // Update messages state with assistant messages
      setMessages((prev) => [...prev, ...assistantMessages]);
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const clearMessages = () => {
    localStorage.removeItem("chatMessages");
    setMessages([]); // Clear the messages state
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        console.log("Text copied to clipboard");
      })
      .catch((err) => {
        console.error("Failed to copy text: ", err);
      });
  };

  const MessageContent = ({
    content,
    role,
  }: {
    content: string;
    role: string;
  }) => {
    return (
      <div>
        <span>{content}</span>
      </div>
    );
  };

  return (
    <div className={styles.chat}>
      <header className={styles.header}>
        <h1>Make SMART goals</h1>
        <button onClick={clearMessages} className={styles.clearButton}>
          Clear Chat
        </button>
      </header>

      <div className={styles.messages}>
        {messages.map((msg) => (
          <div key={msg.id} className={styles.rowWrapper}>
            <div
              className={`${styles.message} ${
                msg.role === "user"
                  ? styles.userMessage
                  : styles.assistantMessage
              }`}
            >
              <MessageContent content={msg.content} role={msg.role} />
            </div>
            {msg.role === "assistant" && (
              <button
                onClick={() => copyToClipboard(msg.content)}
                className={styles.copyButton}
              >
                Copy
              </button>
            )}
          </div>
        ))}
        {isLoading && (
          <div className={styles.loadingMessage}>
            <div className={styles.dot}></div>
            <div className={styles.dot}></div>
            <div className={styles.dot}></div>
          </div>
        )}
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
