'use client';

import { useState, useEffect, useRef } from 'react';
import { useSession } from 'next-auth/react';

interface Message {
  id: string;
  conversation_id: string;
  sender_id: string;
  content: string;
  created_at: string;
  sender_name?: string;
}

interface Conversation {
  id: string;
  patient_id: string;
  doctor_id: string;
  patient_name?: string;
  doctor_name?: string;
  unread_count?: number;
  last_message?: string;
  updated_at: string;
}

export default function ChatWidget() {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [unreadTotal, setUnreadTotal] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Chat disabled until Supabase is configured
  const supabase: null = null;

  // Load conversations
  useEffect(() => {
    if (!session?.user?.email || !supabase) return;

    const loadConversations = async () => {
      const userEmail = session?.user?.email;
      if (!userEmail) return;
      
      const { data: userData } = await supabase.from('chat_users').select('id').eq('email', userEmail).single();

      if (!userData) return;

      const { data } = await supabase.from('conversations').select(`
          *,
          patient:chat_users!conversations_patient_id_fkey(name, email),
          doctor:chat_users!conversations_doctor_id_fkey(name, email)
        `).or(`patient_id.eq.${userData.id},doctor_id.eq.${userData.id}`).order('updated_at', { ascending: false });

      if (data) {
        const formatted = data.map((conv: Conversation & { patient?: { name: string }; doctor?: { name: string } }) => ({
          ...conv,
          patient_name: conv.patient?.name,
          doctor_name: conv.doctor?.name,
        }));
        setConversations(formatted);
        
        const total = formatted.reduce((sum: number, conv: Conversation) => 
          sum + (conv.unread_count || 0), 0
        );
        setUnreadTotal(total);
      }
    };

    loadConversations();
    const interval = setInterval(loadConversations, 5000);
    return () => clearInterval(interval);
  }, [session, supabase]);

  // Load messages for selected conversation
  useEffect(() => {
    if (!selectedConversation || !supabase) return;

    const loadMessages = async () => {
      const { data } = await supabase.from('messages').select(`
          *,
          sender:chat_users(name)
        `).eq('conversation_id', selectedConversation).order('created_at', { ascending: true });

      if (data) {
        const formatted = data.map((msg: Message & { sender?: { name: string } }) => ({
          ...msg,
          sender_name: msg.sender?.name,
        }));
        setMessages(formatted);
      }
    };

    loadMessages();

    // Subscribe to new messages
    const channel = supabase
      .channel(`conversation:${selectedConversation}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: `conversation_id=eq.${selectedConversation}`,
        },
        (payload: { new: Message }) => {
          setMessages((prev) => [...prev, payload.new]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [selectedConversation, supabase]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async () => {
    if (!newMessage.trim() || !selectedConversation || !session?.user?.email || !supabase) return;

    const userEmail = session?.user?.email;
    if (!userEmail) return;
    
    const { data: userData } = await supabase.from('chat_users').select('id').eq('email', userEmail).single();

    if (!userData) return;

    await supabase.from('messages').insert({
      conversation_id: selectedConversation,
      sender_id: userData.id,
      content: newMessage.trim(),
    });

    setNewMessage('');
  };

  if (!session) return null;

  return (
    <>
      {/* Floating Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white rounded-full p-4 shadow-lg z-50 transition-all hover:scale-110"
          aria-label="Abrir chat"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          {unreadTotal > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold">
              {unreadTotal > 9 ? '9+' : unreadTotal}
            </span>
          )}
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className={`fixed bottom-6 right-6 bg-white rounded-lg shadow-2xl z-50 transition-all max-w-[calc(100vw-3rem)] max-h-[calc(100vh-3rem)] ${
          isMinimized ? 'w-80 h-14' : 'w-96 h-[600px]'
        }`}>
          {/* Header */}
          <div className="bg-blue-600 text-white p-4 rounded-t-lg flex items-center justify-between">
            <h3 className="font-semibold flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              Mensajes
            </h3>
            <div className="flex gap-2">
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="hover:bg-blue-700 p-1 rounded"
                aria-label={isMinimized ? "Maximizar" : "Minimizar"}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {isMinimized ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  )}
                </svg>
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="hover:bg-blue-700 p-1 rounded"
                aria-label="Cerrar"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {!isMinimized && (
            <div className="flex h-[calc(100%-56px)]">
              {/* Conversations List */}
              {!selectedConversation && (
                <div className="w-full overflow-y-auto">
                  {conversations.length === 0 ? (
                    <div className="p-8 text-center text-gray-500">
                      <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                      <p className="font-medium">No hay conversaciones</p>
                      <p className="text-sm mt-1">Inicia una conversación desde Pacientes</p>
                    </div>
                  ) : (
                    conversations.map((conv) => (
                      <button
                        key={conv.id}
                        onClick={() => setSelectedConversation(conv.id)}
                        className="w-full p-4 border-b hover:bg-gray-50 text-left transition-colors"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-gray-900 truncate">
                              {conv.patient_name || conv.doctor_name || 'Usuario'}
                            </p>
                            {conv.last_message && (
                              <p className="text-sm text-gray-500 truncate mt-1">
                                {conv.last_message}
                              </p>
                            )}
                          </div>
                          {(conv.unread_count ?? 0) > 0 && (
                            <span className="ml-2 bg-blue-600 text-white text-xs rounded-full px-2 py-1 font-medium">
                              {conv.unread_count}
                            </span>
                          )}
                        </div>
                      </button>
                    ))
                  )}
                </div>
              )}

              {/* Messages View */}
              {selectedConversation && (
                <div className="flex flex-col w-full">
                  {/* Back Button */}
                  <div className="p-3 border-b flex items-center gap-2">
                    <button
                      onClick={() => setSelectedConversation(null)}
                      className="hover:bg-gray-100 p-1 rounded"
                      aria-label="Volver"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    <span className="font-medium text-gray-900">
                      {conversations.find(c => c.id === selectedConversation)?.patient_name || 
                       conversations.find(c => c.id === selectedConversation)?.doctor_name || 
                       'Chat'}
                    </span>
                  </div>

                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-3">
                    {messages.map((msg) => {
                      const isOwn = msg.sender_id === session?.user?.email;
                      return (
                        <div key={msg.id} className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}>
                          <div className={`max-w-[75%] rounded-lg p-3 ${
                            isOwn ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-900'
                          }`}>
                            {!isOwn && msg.sender_name && (
                              <p className="text-xs font-medium mb-1 opacity-75">
                                {msg.sender_name}
                              </p>
                            )}
                            <p className="text-sm whitespace-pre-wrap break-words">{msg.content}</p>
                            <p className={`text-xs mt-1 ${isOwn ? 'text-blue-100' : 'text-gray-500'}`}>
                              {new Date(msg.created_at).toLocaleTimeString('es-ES', {
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                    <div ref={messagesEndRef} />
                  </div>

                  {/* Input */}
                  <div className="p-3 border-t">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && sendMessage()}
                        placeholder="Escribe un mensaje..."
                        className="flex-1 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm"
                      />
                      <button
                        onClick={sendMessage}
                        disabled={!newMessage.trim()}
                        className="bg-blue-600 text-white rounded-lg px-4 py-2 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </>
  );
}
