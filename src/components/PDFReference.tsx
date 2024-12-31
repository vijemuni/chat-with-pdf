import React from 'react';
import { FileText } from 'lucide-react';
import { PDFReference } from '../types';

interface PDFReferenceProps {
  references: PDFReference[];
}

export const PDFReferenceList: React.FC<PDFReferenceProps> = ({ references }) => {
  if (!references?.length) return null;

  return (
    <div className="mt-4 border-t border-blue-200 pt-4">
      <div className="flex items-center gap-2 text-blue-700 mb-2">
        <FileText size={16} />
        <span className="font-medium">References from PDF</span>
      </div>
      <div className="space-y-2">
        {references.map((ref, index) => (
          <div 
            key={index}
            className="bg-blue-50 p-3 rounded-md border border-blue-100"
          >
            <div className="flex items-center gap-2 text-sm text-blue-600 mb-1">
              <span className="font-medium">
                Page {ref.page}, Paragraph {ref.paragraph}
              </span>
            </div>
            <p className="text-sm text-gray-700">{ref.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};