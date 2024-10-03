"use client";
import ChatMessage from "@/components/stream-player/ChatMessage";
import { Skeleton } from "@/components/ui/skeleton";
import { ReceivedChatMessage } from "@livekit/components-react";
import React from "react";
interface ChatListProps {
  messages: ReceivedChatMessage[];
  isHidden: boolean;
}
const ChatList = ({ isHidden, messages }: ChatListProps) => {
  if (isHidden || !messages || messages.length === 0) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <p className="tetx-sm text-muted-foreground">
          {isHidden ? "Chat is disabled" : "Welcome to the chat"}
        </p>
      </div>
    );
  }
  return (
    <div className="flex flex-1 flex-col-reverse overflow-y-auto p-3 h-full">
      {messages.map((m) => (
        <ChatMessage key={m.editTimestamp} data={m} />
      ))}
    </div>
  );
};

export default ChatList;
export const ChatListSkeleton = () => {
  return (
    <div className="flex items-center h0full justify-center">
      <Skeleton className="w-1/2 h-6" />
    </div>
  );
};
