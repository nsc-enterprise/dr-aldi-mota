// Type definitions for chat system
// Separated from chat.ts to avoid module evaluation during build

import type { Database } from '@/types/supabase';

export type ChatUser = Database['public']['Tables']['chat_users']['Row'];
export type Conversation = Database['public']['Tables']['conversations']['Row'];
export type Message = Database['public']['Tables']['messages']['Row'];

export interface ConversationWithUsers extends Conversation {
  patient?: ChatUser;
  doctor?: ChatUser;
}

export interface MessageWithSender extends Message {
  sender?: ChatUser;
}
