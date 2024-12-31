import { GoogleGenerativeAI } from '@google/generative-ai';
import { extractReferences } from './pdfUtils';

const API_KEY = 'AIzaSyCGSJu63nwwqzoT4WzBnNu-SqpUFf3kP0k';
const genAI = new GoogleGenerativeAI(API_KEY);

interface FormattedSection {
  type: 'title' | 'paragraph' | 'list';
  content: string[];
}

const formatResponse = (text: string): { formattedText: string; references: any[] } => {
  // Extract references first
  const references = extractReferences(text);
  
  // Remove reference sections from main text
  let mainText = text.replace(/Page \d+, Paragraph \d+: .*?(?=Page \d+|$)/gs, '').trim();
  
  // Clean markdown formatting
  mainText = mainText.replace(/\*\*(.*?)\*\*/g, '$1')
                    .replace(/\*(.*?)\*/g, '$1')
                    .replace(/`(.*?)`/g, '$1');

  // Split into sections
  const sections = mainText.split('\n\n').filter(Boolean);
  
  // Process each section
  const formattedSections: FormattedSection[] = sections.map(section => {
    if (section.startsWith('#')) {
      return {
        type: 'title',
        content: [section.replace(/^#+\s/, '')]
      };
    } else if (section.match(/^[-•*]\s/m)) {
      return {
        type: 'list',
        content: section.split('\n')
          .filter(Boolean)
          .map(item => item.replace(/^[-•*]\s/, '').trim())
      };
    } else {
      return {
        type: 'paragraph',
        content: [section.trim()]
      };
    }
  });

  // Convert to HTML-like formatting
  const formattedText = formattedSections.map(section => {
    switch (section.type) {
      case 'title':
        return `<div class="text-xl font-bold mb-4">${section.content[0]}</div>`;
      case 'list':
        return `<ul class="list-disc pl-6 mb-4 space-y-2">
          ${section.content.map(item => `<li>${item}</li>`).join('')}
        </ul>`;
      case 'paragraph':
        return `<div class="mb-4">${section.content[0]}</div>`;
      default:
        return section.content[0];
    }
  }).join('\n');

  return { formattedText, references };
};

export const getGeminiResponse = async (prompt: string): Promise<{ text: string; references: any[] }> => {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    const result = await model.generateContent({
      contents: [{
        role: 'user',
        parts: [{
          text: `Please provide a well-structured response with clear sections, paragraphs, and lists where appropriate. After your response, list any relevant PDF references in the format "Page X, Paragraph Y: [relevant text]". Question: ${prompt}`
        }]
      }]
    });
    const response = await result.response;
    const { formattedText, references } = formatResponse(response.text());
    return { text: formattedText, references };
  } catch (error) {
    console.error('Error getting Gemini response:', error);
    throw new Error('Failed to get AI response. Please try again.');
  }
};