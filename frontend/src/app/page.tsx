"use client";

import { Chat } from "@/components/Chat";
import { ReduxProvider } from "@/components/Providers/ReduxProvider";

//import "../styles/globals.css";

export default function Home() {
  return (
    <ReduxProvider>
      <Chat />
    </ReduxProvider>
  );
}
