"use client";

import React, { useState, useEffect, useRef } from "react";
import { DashboardHeader } from "@/components/admin/DashboardHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Send,
  Search,
  User,
  MoreVertical,
  Phone,
  Video,
  Smile,
  Paperclip,
  Check,
  CheckCheck,
  Clock,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { format } from "date-fns";

type Message = {
  id: string;
  senderId: string;
  content: string;
  createdAt: string;
  sender: {
    firstName: string;
    lastName: string;
  };
};

type Conversation = {
  id: string;
  lastMessageAt: string;
  participants: {
    user: {
      id: string;
      firstName: string;
      lastName: string;
      email: string;
    };
  }[];
  messages: {
    content: string;
    createdAt: string;
  }[];
};

export default function MessagingPage() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConversation, setActiveConversation] =
    useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchConversations();
  }, []);

  useEffect(() => {
    if (activeConversation) {
      fetchMessages(activeConversation.id);
    }
  }, [activeConversation]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const fetchConversations = async () => {
    try {
      const res = await fetch("/api/admin/conversations");
      const data = await res.json();
      setConversations(data);
      if (data.length > 0 && !activeConversation) {
        setActiveConversation(data[0]);
      }
    } catch (error) {
      toast.error("Failed to load conversations");
    } finally {
      setLoading(false);
    }
  };

  const fetchMessages = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/conversations/${id}`);
      const data = await res.json();
      setMessages(data);
    } catch (error) {
      toast.error("Failed to load messages");
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !activeConversation) return;

    try {
      const res = await fetch(
        `/api/admin/conversations/${activeConversation.id}`,
        {
          method: "POST",
          body: JSON.stringify({ content: newMessage }),
        },
      );
      const data = await res.json();
      setMessages([
        ...messages,
        { ...data, sender: { firstName: "Admin", lastName: "" } },
      ]);
      setNewMessage("");
      fetchConversations(); // refresh sidebar for last message
    } catch (error) {
      toast.error("Failed to send message");
    }
  };

  const getOtherParticipant = (conv: Conversation) => {
    // simplistic: assume admin is one, guest is other
    return conv.participants[0]?.user;
  };

  return (
    <div className="bg-background flex h-screen flex-col">
      <div className="p-8 pb-0">
        <DashboardHeader
          title="Guest Relations"
          subtitle="Real-time communication with your active and potential guests."
          showFilters={false}
        />
      </div>

      <div className="flex flex-1 gap-6 overflow-hidden p-8">
        {/* Sidebar */}
        <div className="bg-card border-border flex w-96 flex-col overflow-hidden rounded-none border shadow-xl shadow-black/5">
          <div className="border-border space-y-4 border-b p-6">
            <div className="relative">
              <Search className="text-muted-foreground absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2" />
              <Input
                placeholder="Search chats..."
                className="bg-muted/30 h-12 rounded-none border-none pl-12 font-medium"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            {loading ? (
              <div className="text-muted-foreground animate-pulse p-8 text-center text-xs font-black tracking-widest uppercase">
                Synchronizing Chats...
              </div>
            ) : conversations.length === 0 ? (
              <div className="text-muted-foreground p-12 text-center font-medium">
                No active conversations found.
              </div>
            ) : (
              conversations.map((conv) => {
                const guest = getOtherParticipant(conv);
                const isActive = activeConversation?.id === conv.id;
                return (
                  <button
                    key={conv.id}
                    onClick={() => setActiveConversation(conv)}
                    className={cn(
                      "border-border/50 flex w-full items-center gap-4 border-b p-6 text-left transition-all",
                      isActive
                        ? "bg-primary/5 border-l-primary border-l-4"
                        : "hover:bg-muted/30",
                    )}
                  >
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-none bg-[#00303e] text-white shadow-lg">
                      <User className="h-6 w-6" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="mb-1 flex items-start justify-between">
                        <h4 className="truncate text-sm font-black tracking-tight uppercase">
                          {guest?.firstName} {guest?.lastName}
                        </h4>
                        <span className="text-muted-foreground text-[10px] font-black opacity-50">
                          {conv.messages[0]
                            ? format(
                                new Date(conv.messages[0].createdAt),
                                "HH:mm",
                              )
                            : ""}
                        </span>
                      </div>
                      <p className="text-muted-foreground truncate text-xs font-medium">
                        {conv.messages[0]?.content || "No messages yet"}
                      </p>
                    </div>
                  </button>
                );
              })
            )}
          </div>
        </div>

        {/* Chat Area */}
        <div className="bg-card border-border flex flex-1 flex-col overflow-hidden rounded-none border shadow-xl shadow-black/5">
          {activeConversation ? (
            <>
              {/* Chat Header */}
              <div className="border-border bg-muted/10 flex items-center justify-between border-b p-6">
                <div className="flex items-center gap-4">
                  <div className="bg-primary flex h-12 w-12 items-center justify-center rounded-none text-white shadow-xl">
                    <User className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-black tracking-tighter uppercase">
                      {getOtherParticipant(activeConversation)?.firstName}{" "}
                      {getOtherParticipant(activeConversation)?.lastName}
                    </h3>
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 animate-pulse rounded-full bg-green-500" />
                      <span className="text-muted-foreground text-[10px] font-black tracking-widest uppercase opacity-60">
                        Active Now
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="border-border h-10 w-10 rounded-xl"
                  >
                    <Phone className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="border-border h-10 w-10 rounded-xl"
                  >
                    <Video className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="border-border h-10 w-10 rounded-xl"
                  >
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Messages Area */}
              <div className="bg-muted/5 flex-1 space-y-6 overflow-y-auto p-8">
                {messages.map((msg, i) => {
                  const isAdmin =
                    msg.senderId !==
                    getOtherParticipant(activeConversation)?.id;
                  return (
                    <div
                      key={msg.id}
                      className={cn(
                        "flex",
                        isAdmin ? "justify-end" : "justify-start",
                      )}
                    >
                      <div
                        className={cn(
                          "max-w-[70%] rounded-3xl p-5 text-sm leading-relaxed font-medium shadow-sm",
                          isAdmin
                            ? "rounded-br-none bg-[#00303e] text-white"
                            : "border-border rounded-bl-none border bg-white text-zinc-800",
                        )}
                      >
                        <p>{msg.content}</p>
                        <div
                          className={cn(
                            "mt-2 flex items-center gap-2 text-[10px] font-black tracking-widest uppercase opacity-50",
                            isAdmin ? "text-white/70" : "text-muted-foreground",
                          )}
                        >
                          {format(new Date(msg.createdAt), "HH:mm")}
                          {isAdmin && <CheckCheck className="h-3 w-3" />}
                        </div>
                      </div>
                    </div>
                  );
                })}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="border-border bg-muted/10 border-t p-8">
                <form
                  onSubmit={handleSendMessage}
                  className="border-border flex items-center gap-4 rounded-none border bg-white p-2 pr-4 shadow-inner"
                >
                  <Button
                    variant="ghost"
                    size="icon"
                    className="shrink-0 rounded-xl"
                  >
                    <Paperclip className="h-5 w-5 opacity-40" />
                  </Button>
                  <Input
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type a super secure message..."
                    className="flex-1 border-none text-base font-medium shadow-none focus-visible:ring-0"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="shrink-0 rounded-xl"
                  >
                    <Smile className="h-5 w-5 opacity-40" />
                  </Button>
                  <Button
                    type="submit"
                    className="bg-primary flex h-12 w-12 shrink-0 items-center justify-center rounded-xl p-0 text-white shadow-xl transition-all hover:scale-110 active:scale-95"
                  >
                    <Send className="h-5 w-5" />
                  </Button>
                </form>
              </div>
            </>
          ) : (
            <div className="flex flex-1 flex-col items-center justify-center space-y-4 p-12 text-center opacity-30">
              <div className="bg-muted mb-4 flex h-24 w-24 items-center justify-center rounded-none">
                <Send className="text-muted-foreground h-10 w-10" />
              </div>
              <h3 className="text-xl tracking-tighter uppercase">
                Select a conversation
              </h3>
              <p className="max-w-xs text-sm font-medium">
                Choose a chat from the sidebar to start corresponding with your
                guests.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
