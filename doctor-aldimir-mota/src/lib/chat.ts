import { getSupabaseClient } from './supabaseClient';
import type { Database } from '@/types/supabase';

type ChatUser = Database['public']['Tables']['chat_users']['Row'];
type Conversation = Database['public']['Tables']['conversations']['Row'];
type Message = Database['public']['Tables']['messages']['Row'];

export interface ConversationWithUsers extends Conversation {
  patient?: ChatUser;
  doctor?: ChatUser;
}

export interface MessageWithSender extends Message {
  sender?: ChatUser;
}

// Initialize chat client
function getChatClient() {
  return getSupabaseClient();
}

// User operations
export const chatUsers = {
  async createOrUpdate(userData: { email: string; nombre: string; avatar_url?: string; role?: 'patient' | 'doctor' | 'admin' }) {
    const client = getChatClient();
    const { data, error } = await (client.from('chat_users') as any)
      .upsert(userData, { onConflict: 'email' })
      .select()
      .single();
    
    if (error) throw error;
    return data as ChatUser;
  },

  async getByEmail(email: string) {
    const client = getChatClient();
    const { data, error } = await (client.from('chat_users') as any)
      .select('*')
      .eq('email', email)
      .single();
    
    if (error) throw error;
    return data as ChatUser;
  },

  async updateLastSeen(userId: string) {
    const client = getChatClient();
    const { error } = await (client.from('chat_users') as any)
      .update({ last_seen: new Date().toISOString() })
      .eq('id', userId);
    
    if (error) throw error;
  },

  async getAll() {
    const client = getChatClient();
    const { data, error } = await (client.from('chat_users') as any)
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data as ChatUser[];
  }
};

// Conversation operations
export const conversations = {
  async create(patientId: string, doctorId: string) {
    const client = getChatClient();
    const { data, error } = await (client.from('conversations') as any)
      .insert({ patient_id: patientId, doctor_id: doctorId })
      .select()
      .single();
    
    if (error) throw error;
    return data as Conversation;
  },

  async getOrCreate(patientId: string, doctorId: string) {
    const client = getChatClient();
    
    // Try to find existing conversation
    const { data: existing, error: findError } = await (client.from('conversations') as any)
      .select('*')
      .eq('patient_id', patientId)
      .eq('doctor_id', doctorId)
      .single();
    
    if (existing) return existing as Conversation;
    
    // Create new conversation if not found
    return this.create(patientId, doctorId);
  },

  async getByUserId(userId: string, role: 'patient' | 'doctor' = 'patient') {
    const client = getChatClient();
    const field = role === 'patient' ? 'patient_id' : 'doctor_id';
    
    const { data, error } = await (client.from('conversations') as any)
      .select(`
        *,
        patient:patient_id(*),
        doctor:doctor_id(*)
      `)
      .eq(field, userId)
      .order('updated_at', { ascending: false });
    
    if (error) throw error;
    return data as ConversationWithUsers[];
  },

  async resetUnreadCount(conversationId: string, role: 'patient' | 'doctor') {
    const client = getChatClient();
    const field = role === 'patient' ? 'unread_count_patient' : 'unread_count_doctor';
    
    const { error } = await (client.from('conversations') as any)
      .update({ [field]: 0 })
      .eq('id', conversationId);
    
    if (error) throw error;
  },

  async updateStatus(conversationId: string, status: 'active' | 'archived' | 'closed') {
    const client = getChatClient();
    const { error } = await (client.from('conversations') as any)
      .update({ status })
      .eq('id', conversationId);
    
    if (error) throw error;
  }
};

// Message operations
export const messages = {
  async send(conversationId: string, senderId: string, content: string, type: 'text' | 'image' | 'file' | 'system' = 'text') {
    const client = getChatClient();
    const { data, error } = await (client.from('messages') as any)
      .insert({
        conversation_id: conversationId,
        sender_id: senderId,
        content,
        type
      })
      .select()
      .single();
    
    if (error) throw error;
    return data as Message;
  },

  async getByConversation(conversationId: string, limit = 50) {
    const client = getChatClient();
    const { data, error } = await (client.from('messages') as any)
      .select(`
        *,
        sender:sender_id(*)
      `)
      .eq('conversation_id', conversationId)
      .order('created_at', { ascending: true })
      .limit(limit);
    
    if (error) throw error;
    return data as MessageWithSender[];
  },

  async markAsRead(messageIds: string[]) {
    const client = getChatClient();
    const { error } = await (client.from('messages') as any)
      .update({ 
        is_read: true, 
        read_at: new Date().toISOString() 
      })
      .in('id', messageIds);
    
    if (error) throw error;
  },

  async subscribeToConversation(conversationId: string, callback: (message: Message) => void) {
    const client = getChatClient();
    
    const subscription = client
      .channel(`messages:${conversationId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: `conversation_id=eq.${conversationId}`
        },
        (payload) => {
          callback(payload.new as Message);
        }
      )
      .subscribe();
    
    return subscription;
  },

  async unsubscribe(subscription: any) {
    const client = getChatClient();
    await client.removeChannel(subscription);
  }
};
