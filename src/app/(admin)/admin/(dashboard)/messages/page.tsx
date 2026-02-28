"use client";

import React, { useState } from "react";
import { DashboardHeader } from "@/components/admin/DashboardHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Search,
  Send,
  Phone,
  MoreVertical,
  User,
  Paperclip,
  Smile,
  Check,
  CheckCheck,
  Clock,
  ArrowLeft,
  Mail,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const MOCK_CHATS = [
  {
    id: "1",
    name: "Dushime Aime",
    lastMessage: "Thank you for the early check-in!",
    time: "2m ago",
    unread: 2,
    online: true,
    avatar: "https://i.pravatar.cc/150?u=1",
    room: "S-01",
  },
  {
    id: "2",
    name: "Marcus Richardson",
    lastMessage: "Is breakfast included in my stay?",
    time: "1h ago",
    unread: 0,
    online: false,
    avatar: "https://i.pravatar.cc/150?u=2",
    room: "S-12",
  },
  {
    id: "3",
    name: "Elena Vasquez",
    lastMessage: "The WiFi password isn't working.",
    time: "3h ago",
    unread: 0,
    online: true,
    avatar: "https://i.pravatar.cc/150?u=3",
    room: "S-07",
  },
  {
    id: "4",
    name: "David Chen",
    lastMessage: "Can I request extra pillows?",
    time: "Yesterday",
    unread: 0,
    online: false,
    avatar: "https://i.pravatar.cc/150?u=4",
    room: "S-14",
  },
];

const MOCK_MESSAGES = [
  {
    id: "1",
    text: "Hello! I'll be arriving a bit late today, around 8 PM.",
    sender: "guest",
    time: "10:30 AM",
  },
  {
    id: "2",
    text: "No problem at all, Dushime. Our front desk is open 24/7. We've noted your arrival time.",
    sender: "admin",
    time: "10:35 AM",
  },
  {
    id: "3",
    text: "Great, thank you! Is there parking available?",
    sender: "guest",
    time: "10:40 AM",
  },
  {
    id: "4",
    text: "Yes, we have secure underground parking for guests. It's complimentary for your stay.",
    sender: "admin",
    time: "10:42 AM",
  },
  {
    id: "5",
    text: "Thank you for the early check-in!",
    sender: "guest",
    time: "2:15 PM",
  },
];

export default function MessagingPage() {
  const [selectedChat, setSelectedChat] = useState<any>(MOCK_CHATS[0]);
  const [message, setMessage] = useState("");

  return (
    <div className="bg-card flex h-[calc(100vh-64px)] overflow-hidden">
      {/* Sidebar - Chat List */}
      <div className="border-border bg-card/50 flex w-full flex-col border-r sm:w-80 lg:w-96">
        <div className="space-y-4 p-6">
          <h2 className="text-2xl font-bold">Messages</h2>
          <div className="relative">
            <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
            <Input
              placeholder="Search conversations..."
              className="border-border bg-background h-10 rounded-2xl pl-10"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {MOCK_CHATS.map((chat) => (
            <button
              key={chat.id}
              onClick={() => setSelectedChat(chat)}
              className={cn(
                "hover:bg-muted/50 flex w-full gap-4 border-y border-transparent p-4 transition-all",
                selectedChat.id === chat.id && "bg-muted border-border",
              )}
            >
              <div className="relative">
                <Avatar className="border-border h-12 w-12 rounded-2xl border">
                  <AvatarImage src={chat.avatar} />
                  <AvatarFallback>{chat.name[0]}</AvatarFallback>
                </Avatar>
                {chat.online && (
                  <div className="border-background absolute -right-1 -bottom-1 h-3.5 w-3.5 rounded-2xl border-2 bg-green-500" />
                )}
              </div>
              <div className="flex-1 space-y-1 overflow-hidden text-left">
                <div className="flex items-baseline justify-between">
                  <span className="truncate text-sm font-bold">
                    {chat.name}
                  </span>
                  <span className="text-muted-foreground text-[10px] uppercase">
                    {chat.time}
                  </span>
                </div>
                <div className="flex items-center justify-between gap-2">
                  <p className="text-muted-foreground flex-1 truncate text-xs leading-relaxed">
                    {chat.lastMessage}
                  </p>
                  {chat.unread > 0 && (
                    <span className="bg-primary text-primary-foreground flex h-5 w-5 scale-75 items-center justify-center rounded-2xl text-[10px] font-black">
                      {chat.unread}
                    </span>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="bg-card flex flex-1 flex-col">
        {selectedChat ? (
          <>
            {/* Header */}
            <header className="border-border flex h-20 items-center justify-between border-b px-8">
              <div className="flex items-center gap-4">
                <button className="hover:bg-muted rounded-2xl p-2 sm:hidden">
                  <ArrowLeft className="h-5 w-5" />
                </button>
                <div className="relative">
                  <Avatar className="border-border h-12 w-12 rounded-2xl border">
                    <AvatarImage src={selectedChat.avatar} />
                    <AvatarFallback>{selectedChat.name[0]}</AvatarFallback>
                  </Avatar>
                  {selectedChat.online && (
                    <div className="border-background absolute -right-1 -bottom-1 h-3.5 w-3.5 rounded-2xl border-2 bg-green-500" />
                  )}
                </div>
                <div className="space-y-0.5">
                  <h3 className="text-lg font-bold">{selectedChat.name}</h3>
                  <div className="text-muted-foreground flex items-center gap-2 text-xs font-bold tracking-wider uppercase">
                    <span className="text-primary">{selectedChat.room}</span>
                    <span className="opacity-30">•</span>
                    <span>{selectedChat.online ? "Online" : "Away"}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="border-border rounded-none"
                >
                  <Phone className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="border-border rounded-none"
                >
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </div>
            </header>

            {/* Messages */}
            <div className="flex-1 space-y-6 overflow-y-auto p-8">
              <div className="flex justify-center">
                <span className="text-muted-foreground bg-muted/50 border-border border px-3 py-1 text-[10px] font-black uppercase">
                  Today, Oct 24
                </span>
              </div>
              {MOCK_MESSAGES.map((msg) => (
                <div
                  key={msg.id}
                  className={cn(
                    "flex max-w-[80%] flex-col space-y-1",
                    msg.sender === "admin"
                      ? "ml-auto items-end"
                      : "items-start",
                  )}
                >
                  <div
                    className={cn(
                      "rounded-2xl border p-4 text-sm leading-relaxed shadow-sm",
                      msg.sender === "admin"
                        ? "border-[#00303e] bg-[#00303e] text-white"
                        : "bg-muted/50 text-foreground border-border",
                    )}
                  >
                    {msg.text}
                  </div>
                  <div className="flex items-center gap-1.5 px-1">
                    <span className="text-muted-foreground text-[10px] font-bold uppercase">
                      {msg.time}
                    </span>
                    {msg.sender === "admin" && (
                      <CheckCheck className="text-primary h-3 w-3" />
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <footer className="border-border bg-card/50 border-t p-8">
              <div className="relative">
                <div className="absolute top-1/2 left-4 flex -translate-y-1/2 items-center gap-3">
                  <button className="text-muted-foreground hover:text-foreground transition-colors">
                    <Paperclip className="h-5 w-5" />
                  </button>
                  <button className="text-muted-foreground hover:text-foreground transition-colors">
                    <Smile className="h-5 w-5" />
                  </button>
                </div>
                <Input
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type your message here..."
                  className="border-border bg-background focus-visible:ring-primary/20 h-14 w-full rounded-2xl pr-32 pl-20"
                />
                <div className="absolute top-1/2 right-4 -translate-y-1/2">
                  <Button className="shadow-primary/10 h-10 rounded-2xl bg-[#00303e] px-6 font-bold text-white shadow-lg">
                    Send <Send className="ml-2 h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
            </footer>
          </>
        ) : (
          <div className="text-muted-foreground flex flex-1 flex-col items-center justify-center p-8">
            <div className="bg-muted mb-6 flex h-24 w-24 items-center justify-center">
              <Mail className="h-10 w-10 opacity-20" />
            </div>
            <h3 className="text-foreground text-xl font-bold">
              Select a conversation
            </h3>
            <p className="mt-2 max-w-xs text-center text-sm">
              Choose a guest from the list on the left to start messaging.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
