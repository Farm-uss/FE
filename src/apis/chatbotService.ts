import axiosInstance from './axios';

export interface ChatbotResponse {
  result: string;
  data: {
    answer: string;
  };
  message: string;
}

export const sendChatMessage = async (message: string): Promise<string> => {
  const response = await axiosInstance.post<ChatbotResponse>('/api/chatbot', {
    message,
  });
  return response.data.data.answer;
};
