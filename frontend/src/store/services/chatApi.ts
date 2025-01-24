import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export type ChatMessage = {
  choices: any;
  id: string;
  content: any;
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
                "You are a SMART goals expert. Analyze the input and provide three SMART goal suggestions and identify missing SMART components. Give a short comments (not more 1 little sentences)",
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
