import React, { useState } from 'react';
import { Header } from './components/Header';
import { FileUpload } from './components/FileUpload';
import { PDFViewer } from './components/PDFViewer';
import { ChatInterface } from './components/ChatInterface';
import { getGeminiResponse } from './utils/gemini';
import { Message } from './types';

export function App() {
  const [file, setFile] = useState<File | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    setError(null);
    
    if (!selectedFile) return;
    
    if (!selectedFile.type.includes('pdf')) {
      setError('Please upload a PDF file');
      return;
    }
    
    if (selectedFile.size > 10 * 1024 * 1024) {
      setError('File size must be less than 10MB');
      return;
    }
    
    setFile(selectedFile);
  };

  const handleClearFile = () => {
    setFile(null);
    setMessages([]);
    setError(null);
  };

  const handleSubmit = async (message: string) => {
    setMessages(prev => [...prev, { text: message, isBot: false }]);
    
    try {
      setLoading(true);
      const { text, references } = await getGeminiResponse(message);
      setMessages(prev => [...prev, { text, isBot: true, references }]);
    } catch (error) {
      setError('Failed to get response. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            <FileUpload
              onFileChange={handleFileChange}
              file={file}
              error={error}
              onClearFile={handleClearFile}
            />
            {file && <PDFViewer file={file} />}
          </div>

          <ChatInterface
            messages={messages}
            loading={loading}
            onSubmit={handleSubmit}
            disabled={!file}
          />
        </div>
      </div>
    </div>
  );
}

export default App;