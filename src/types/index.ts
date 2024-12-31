export interface Message {
  text: string;
  isBot: boolean;
  references?: PDFReference[];
}

export interface PDFReference {
  page: number;
  paragraph: number;
  text: string;
}

export interface ChatError {
  message: string;
  code?: string;
}