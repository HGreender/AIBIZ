import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface ChatMessage {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: number;
}

export const chatApi = createApi({
  reducerPath: "chatApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://api.vsegpt.ru/v1/" }),
  endpoints: (builder) => ({
    sendMessage: builder.mutation<ChatMessage, string>({
      query: (message) => ({
        url: "chat/completions",
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          "content-type": "application/json",
        },
        body: JSON.stringify({
          model: "openai/gpt-3.5-turbo",
          messages: [{ role: "user", content: message }],
        }),
      }),
    }),
  }),
});

export const { useSendMessageMutation } = chatApi;

// fetch("https://api.vsegpt.ru/v1/chat/completions", {
//   method: "POST",
//   headers: {
//     Authorization: `Bearer ${VSEGPT_API_KEY}`,
//     "Content-Type": "application/json",
//   },
//   body: JSON.stringify({
//     model: "openai/gpt-3.5-turbo",
//     messages: [{ role: "user", content: "What is the meaning of life?" }],
//   }),
// });
