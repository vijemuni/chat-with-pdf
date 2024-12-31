import React from 'react';
import { BookOpen } from 'lucide-react';

export const Header = () => {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-6 px-4 mb-8">
      <div className="container mx-auto flex items-center justify-between">
        {/* Left Section */}
        <div className="flex items-center space-x-3">
          <BookOpen className="w-8 h-8" />
          <div>
            <h1 className="text-2xl font-bold">Chat With PDF</h1>
            <p className="text-blue-100">Upload your PDF and start a conversation</p>
          </div>
        </div>

        {/* Right Section */}
        <div className="bg-white rounded-full p-1">
          <img
            src="https://i.postimg.cc/3xPzgYsY/new-logo.png"
            alt="Logo"
            className="w-20 h-20 object-cover rounded-full"
          />
        </div>
      </div>
    </div>
  );
};
