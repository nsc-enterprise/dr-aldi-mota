'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import ChatBox from '@/components/ChatBox';
import ConversationList from '@/components/ConversationList';
import { conversations, messages, chatUsers, MessageWithSender, ConversationWithUsers } from '@/lib/chat';

export const runtime = 'edge';

function ChatPageContent() {
  const { data: session, status } = useSession();
  const searchParams = useSearchParams();
  const conversationId = searchParams?.get('id') ?? undefined;

  const [allConversations, setAllConversations] = useState<ConversationWithUsers[]>([]);
  const [currentMessages, setCurrentMessages] = useState<MessageWithSender[]>([]);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMessages, setIsLoadingMessages] = useState(false);

  // Initialize current user
  useEffect(() => {
    if (status === 'authenticated' && session?.user) {
      const initUser = async () => {
        try {
          const user = await chatUsers.createOrUpdate({
            email: session.user.email!,
            nombre: session.user.name || 'Usuario',
            avatar_url: session.user.image || undefined,
            role: 'patient' // Default role, you can customize this
          });
          setCurrentUser(user);
        } catch (error) {
          console.error('Error initializing user:', error);
        }
      };
      initUser();
    }
  }, [status, session]);

  // Load conversations
  useEffect(() => {
    if (!currentUser) return;

    const loadConversations = async () => {
      try {
        setIsLoading(true);
        const convs = await conversations.getByUserId(currentUser.id, currentUser.role);
        setAllConversations(convs);
      } catch (error) {
        console.error('Error loading conversations:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadConversations();
  }, [currentUser]);

  // Load messages for selected conversation
  useEffect(() => {
    if (!conversationId || !currentUser) return;

    const loadMessages = async () => {
      try {
        setIsLoadingMessages(true);
        const msgs = await messages.getByConversation(conversationId);
        setCurrentMessages(msgs);

        // Mark messages as read
        const unreadIds = msgs
          .filter(m => !m.is_read && m.sender_id !== currentUser.id)
          .map(m => m.id);
        
        if (unreadIds.length > 0) {
          await messages.markAsRead(unreadIds);
          await conversations.resetUnreadCount(conversationId, currentUser.role);
        }
      } catch (error) {
        console.error('Error loading messages:', error);
      } finally {
        setIsLoadingMessages(false);
      }
    };

    loadMessages();

    // Subscribe to new messages
    const subscription = messages.subscribeToConversation(conversationId, (newMessage) => {
      setCurrentMessages(prev => [...prev, newMessage as MessageWithSender]);
      
      // Mark as read if not from current user
      if (newMessage.sender_id !== currentUser.id) {
        messages.markAsRead([newMessage.id]);
        conversations.resetUnreadCount(conversationId, currentUser.role);
      }
    });

    return () => {
      subscription.then(sub => messages.unsubscribe(sub));
    };
  }, [conversationId, currentUser]);

  const handleSendMessage = async (content: string) => {
    if (!conversationId || !currentUser) return;

    await messages.send(conversationId, currentUser.id, content);
    // Message will be added via subscription
  };

  const handleCreateConversation = async () => {
    if (!currentUser) return;

    try {
      // For demo purposes, create conversation with a default doctor
      // In production, you'd have a UI to select the doctor
      const doctorEmail = 'doctor@example.com'; // Replace with actual doctor selection
      
      // First, ensure doctor user exists
      let doctor = await chatUsers.getByEmail(doctorEmail).catch(() => null);
      
      if (!doctor) {
        doctor = await chatUsers.createOrUpdate({
          email: doctorEmail,
          nombre: 'Dr. Aldimir Mota',
          role: 'doctor'
        });
      }

      const newConv = await conversations.create(currentUser.id, doctor.id);
      window.location.href = `/chat?id=${newConv.id}`;
    } catch (error) {
      console.error('Error creating conversation:', error);
      alert('Error al crear la conversación. Por favor, intenta de nuevo.');
    }
  };

  if (status === 'loading' || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (status === 'unauthenticated') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Acceso denegado</h1>
          <p className="text-gray-600 mb-4">Debes iniciar sesión para acceder al chat.</p>
          <a 
            href="/agendar" 
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Iniciar sesión
          </a>
        </div>
      </div>
    );
  }

  if (!currentUser) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Chat Médico</h1>
          <p className="text-gray-600 mt-2">Comunícate con tu médico en tiempo real</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-200px)]">
          {/* Conversations List */}
          <div className="lg:col-span-1">
            <ConversationList
              conversations={allConversations}
              currentUserId={currentUser.id}
              userRole={currentUser.role}
              selectedConversationId={conversationId || undefined}
            />
            
            {/* New Conversation Button */}
            {currentUser.role === 'patient' && (
              <button
                onClick={handleCreateConversation}
                className="w-full mt-4 bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
              >
                + Nueva Conversación
              </button>
            )}
          </div>

          {/* Chat Area */}
          <div className="lg:col-span-2">
            {conversationId ? (
              <ChatBox
                conversationId={conversationId}
                currentUserId={currentUser.id}
                messages={currentMessages}
                onSendMessage={handleSendMessage}
                isLoading={isLoadingMessages}
              />
            ) : (
              <div className="bg-white rounded-lg shadow-md h-full flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <svg 
                    className="w-24 h-24 mx-auto mb-4 text-gray-300" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={1.5} 
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" 
                    />
                  </svg>
                  <p className="text-lg">Selecciona una conversación para comenzar</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ChatPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    }>
      <ChatPageContent />
    </Suspense>
  );
}
