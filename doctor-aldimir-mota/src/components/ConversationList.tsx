'use client';

import { ConversationWithUsers } from '@/lib/chatTypes';
import Link from 'next/link';

interface ConversationListProps {
  conversations: ConversationWithUsers[];
  currentUserId: string;
  userRole: 'patient' | 'doctor';
  selectedConversationId?: string;
}

export default function ConversationList({ 
  conversations, 
  currentUserId,
  userRole,
  selectedConversationId 
}: ConversationListProps) {
  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);

    if (diffInHours < 24) {
      return date.toLocaleTimeString('es-ES', { 
        hour: '2-digit', 
        minute: '2-digit' 
      });
    } else if (diffInHours < 168) { // Less than 7 days
      return date.toLocaleDateString('es-ES', { weekday: 'short' });
    } else {
      return date.toLocaleDateString('es-ES', { 
        day: 'numeric', 
        month: 'short' 
      });
    }
  };

  const getOtherUser = (conversation: ConversationWithUsers) => {
    return userRole === 'patient' ? conversation.doctor : conversation.patient;
  };

  const getUnreadCount = (conversation: ConversationWithUsers) => {
    return userRole === 'patient' 
      ? conversation.unread_count_patient 
      : conversation.unread_count_doctor;
  };

  return (
    <div className="bg-white rounded-lg shadow-md h-full flex flex-col">
      {/* Header */}
      <div className="border-b p-4">
        <h2 className="text-xl font-bold text-gray-900">Conversaciones</h2>
        <p className="text-sm text-gray-600 mt-1">
          {conversations.length} conversación{conversations.length !== 1 ? 'es' : ''}
        </p>
      </div>

      {/* Conversation List */}
      <div className="flex-1 overflow-y-auto">
        {conversations.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-500 p-8">
            <svg 
              className="w-16 h-16 mb-4 text-gray-300" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" 
              />
            </svg>
            <p className="text-center">
              No hay conversaciones aún.
              <br />
              <span className="text-sm">
                {userRole === 'doctor' 
                  ? 'Espera a que un paciente inicie una conversación.' 
                  : 'Inicia una conversación con el doctor.'}
              </span>
            </p>
          </div>
        ) : (
          <div className="divide-y">
            {conversations.map((conversation) => {
              const otherUser = getOtherUser(conversation);
              const unreadCount = getUnreadCount(conversation);
              const isSelected = conversation.id === selectedConversationId;

              if (!otherUser) return null;

              return (
                <Link
                  key={conversation.id}
                  href={`/chat?id=${conversation.id}`}
                  className={`block p-4 hover:bg-gray-50 transition-colors ${
                    isSelected ? 'bg-blue-50 border-l-4 border-blue-600' : ''
                  }`}
                >
                  <div className="flex items-start gap-3">
                    {/* Avatar */}
                    <div className="flex-shrink-0">
                      {otherUser.avatar_url ? (
                        <img
                          src={otherUser.avatar_url}
                          alt={otherUser.nombre}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
                          {otherUser.nombre.charAt(0).toUpperCase()}
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-semibold text-gray-900 truncate">
                          {otherUser.nombre}
                        </h3>
                        <span className="text-xs text-gray-500 flex-shrink-0 ml-2">
                          {conversation.last_message_at && formatTime(conversation.last_message_at)}
                        </span>
                      </div>
                      
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-sm text-gray-600 truncate flex-1">
                          {conversation.last_message || 'No hay mensajes aún'}
                        </p>
                        
                        {unreadCount > 0 && (
                          <span className="bg-blue-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0">
                            {unreadCount > 9 ? '9+' : unreadCount}
                          </span>
                        )}
                      </div>

                      {/* Status indicator */}
                      {conversation.status !== 'active' && (
                        <div className="mt-1">
                          <span className="inline-block px-2 py-0.5 text-xs rounded-full bg-gray-200 text-gray-600">
                            {conversation.status === 'archived' ? 'Archivado' : 'Cerrado'}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
