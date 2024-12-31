import React from 'react';
import { Upload, File, X } from 'lucide-react';

interface FileUploadProps {
  onFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  file: File | null;
  error: string | null;
  onClearFile: () => void;
}

export const FileUpload: React.FC<FileUploadProps> = ({ onFileChange, file, error, onClearFile }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      {file ? (
        <div className="flex items-center justify-between p-4 border rounded-lg bg-blue-50">
          <div className="flex items-center space-x-3">
            <File className="w-6 h-6 text-blue-600" />
            <div>
              <p className="font-medium text-gray-800">{file.name}</p>
              <p className="text-sm text-gray-500">
                {(file.size / (1024 * 1024)).toFixed(2)} MB
              </p>
            </div>
          </div>
          <button
            onClick={onClearFile}
            className="p-2 hover:bg-blue-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      ) : (
        <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <Upload className="w-8 h-8 mb-3 text-blue-600" />
            <p className="mb-2 text-sm text-gray-700">
              <span className="font-semibold">Click to upload</span> or drag and drop
            </p>
            <p className="text-xs text-gray-500">PDF (MAX. 10MB)</p>
          </div>
          <input
            type="file"
            className="hidden"
            accept=".pdf"
            onChange={onFileChange}
          />
        </label>
      )}
      {error && (
        <p className="mt-2 text-sm text-red-600 bg-red-50 p-2 rounded">{error}</p>
      )}
    </div>
  );
};