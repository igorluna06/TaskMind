import api from '../api';

export const aiService = {
  async interpretCreate(message: string, conversationId?: number) {
    const response = await api.post('/ai/create', { message, conversationId });
    return response.data;
  },

  async interpretFind(message: string, conversationId?: number) {
    const response = await api.post('/ai/find', { message, conversationId });
    return response.data;
  },

  async interpretFindFilter(message: string, conversationId?: number) {
    const response = await api.post('/ai/find/filter', { message, conversationId });
    return response.data;
  },

  async interpretUpdate(message: string, conversationId?: number) {
    const response = await api.post('/ai/update', { message, conversationId });
    return response.data;
  },

  async interpretDelete(message: string, conversationId?: number) {
    const response = await api.post('/ai/delete', { message, conversationId });
    return response.data;
  },
};