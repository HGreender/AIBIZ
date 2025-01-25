import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

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
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          "content-type": "application/json",
        },
        body: JSON.stringify({
          model: "openai/gpt-3.5-turbo",
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
