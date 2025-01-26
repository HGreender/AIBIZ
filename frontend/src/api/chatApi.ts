import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const AUTH_TOKEN_KEY = "OPENAI_API_KEY";
const getAuthToken = (): string | null | undefined => {
  if (typeof window !== "undefined") {
    return getLocalStorage(AUTH_TOKEN_KEY);
  }
  return null;
};
const getLocalStorage = (key: string) => {
  try {
    const item = localStorage.getItem(key);
    return item ? String(item) : process.env.OPENAI_API_KEY;
  } catch (error) {
    console.error("Error reading from localStorage:", error);
    return "";
  }
};

const savedApiKey = getAuthToken();
//console.log("OPENAI_API_KEY", savedApiKey);
export type ChatMessage = {
  choices: any;
  id: string;
  content: any;
  comment?: string;
  role: "user" | "assistant";
  timestamp: number;
};

export const chatApi = createApi({
  reducerPath: "chatApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://api.vsegpt.ru/v1/" }),
  endpoints: (builder) => ({
    sendMessage: builder.mutation<ChatMessage, string>({
      query: (message) => ({
        url: "chat/completions",
        method: "POST",
        headers: {
          // Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          Authorization: `Bearer ${savedApiKey}`,
          "content-type": "application/json",
        },
        body: JSON.stringify({
          model: "openai/gpt-4o-mini",
          messages: [
            {
              role: "system",
              content:
                "you will be provided with a man formulated task and you should analyse it by creteria of SMART. Your answer should contain only 2 blocks as object: 1. You should give back letters of SMART by wich this task is not related(letters only).  key - not_smart 2. You should offer 5 options for correctly formulated task by creteria of SMART.  key - suggestions",
            },
            { role: "user", content: message },
          ],
        }),
      }),
    }),
  }),
});

export const { useSendMessageMutation } = chatApi;

// "you will be provided with a man formulated task and you should analyse it by creteria of SMART. Your answer should contain only 2 blocks as object: 1. You should give back letters of SMART by wich this task is not related(letters only).  key - not_smart 2. You should offer 5 options for correctly formulated task by creteria of SMART.  key - suggestions",
