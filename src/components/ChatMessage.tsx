import React from 'react';
import { MessageCircle, Bot } from 'lucide-react';
import { Message } from '../types';
import { PDFReferenceList } from './PDFReference';

interface ChatMessageProps {
  message: Message;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  return (
    <div 
      className={`flex items-start space-x-3 p-4 rounded-lg transition-colors ${
        message.isBot 
          ? 'bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200'
          : 'bg-white border border-gray-200'
      }`}
    >
      <div 
        className={`p-2 rounded-full ${
          message.isBot 
            ? 'bg-blue-200 text-blue-700'
            : 'bg-green-200 text-green-700'
        }`}
      >
        {message.isBot ? <Bot size={20} /> : <MessageCircle size={20} />}
      </div>
      <div className="flex-1">
        {message.isBot ? (
          <>
            <div 
              className="prose prose-sm max-w-none text-gray-800"
              dangerouslySetInnerHTML={{ __html: message.text }}
            />
            {message.references && <PDFReferenceList references={message.references} />}
          </>
        ) : (
          <p className="text-gray-700">{message.text}</p>
        )}
      </div>
    </div>
  );
};