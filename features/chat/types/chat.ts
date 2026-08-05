export type MessageStatus = "sent" | "delivered" | "read";

export interface User {
  id: string;
  name: string;
  avatar: string;
  status: "online" | "offline" | "away" | "busy";
  role?: string;
}

export interface Message {
  id: string;
  senderId: string;
  content: string;
  timestamp: string;
  status: MessageStatus;
  reactions?: Reaction[];
  replyTo?: string;
  edited?: boolean;
}

export interface Reaction {
  emoji: string;
  userIds: string[];
}

export interface Conversation {
  id: string;
  type: "direct" | "group" | "channel";
  name: string;
  avatar?: string;
  participants: string[];
  lastMessage?: Message;
  unreadCount: number;
  pinned?: boolean;
  description?: string;
}

export interface Channel {
  id: string;
  name: string;
  description: string;
  isPrivate: boolean;
  memberCount: number;
  unreadCount: number;
}

export interface TypingUser {
  userId: string;
  conversationId: string;
}

export interface ChatState {
  activeConversationId: string | null;
  searchQuery: string;
  showMobileSidebar: boolean;
}
