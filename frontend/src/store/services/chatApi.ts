import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface ChatMessage {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: number;
}

export const chatApi = createApi({
  reducerPath: "chatApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  endpoints: (builder) => ({
    sendMessage: builder.mutation<ChatMessage, string>({
      query: (message) => ({
        url: "/chat/messages",
        method: "POST",
        body: { message },
      }),
    }),
  }),
});

export const { useSendMessageMutation } = chatApi;
