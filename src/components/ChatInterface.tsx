import React, { useRef } from 'react';
import { Send } from 'lucide-react';
import { ChatMessage } from './ChatMessage';
import { Message } from '../types';

interface ChatInterfaceProps {
  messages: Message[];
  loading: boolean;
  onSubmit: (message: string) => void;
  disabled: boolean;
}

export const ChatInterface: React.FC<ChatInterfaceProps> = ({
  messages,
  loading,
  onSubmit,
  disabled,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputRef.current?.value.trim()) return;
    onSubmit(inputRef.current.value);
    inputRef.current.value = '';
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 h-[calc(100vh-12rem)] flex flex-col">
      <div className="flex-1 overflow-auto space-y-4 mb-4 custom-scrollbar">
        {messages.length === 0 && (
          <div className="text-center text-gray-500 mt-8">
            <p className="text-lg font-medium">Welcome to Chat With PDF</p>
            <p className="text-sm">Upload a PDF and start asking questions</p>
          </div>
        )}
        {messages.map((message, index) => (
          <ChatMessage key={index} message={message} />
        ))}
        {loading && (
          <div className="flex items-center space-x-2 text-gray-500 bg-gray-50 p-4 rounded-lg">
            <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" />
            <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce delay-100" />
            <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce delay-200" />
          </div>
        )}
      </div>
      
      <form onSubmit={handleSubmit} className="flex items-center space-x-2">
        <input
          ref={inputRef}
          type="text"
          placeholder={disabled ? 'Please upload a PDF first...' : 'Ask about the PDF...'}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          disabled={disabled || loading}
        />
        <button
          type="submit"
          disabled={disabled || loading}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <Send size={20} />
        </button>
      </form>
    </div>
  );
};