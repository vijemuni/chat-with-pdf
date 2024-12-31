import { PDFReference } from '../types';

export const extractReferences = (text: string): PDFReference[] => {
  const references: PDFReference[] = [];
  const regex = /Page (\d+), Paragraph (\d+): (.*?)(?=Page \d+|$)/gs;
  
  let match;
  while ((match = regex.exec(text)) !== null) {
    references.push({
      page: parseInt(match[1], 10),
      paragraph: parseInt(match[2], 10),
      text: match[3].trim()
    });
  }
  
  return references;
};