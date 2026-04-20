import api from '../api';

export interface EventDTO {
  id?: number;
  title: string;
  type: string;
  description: string;
  date: string;
  time: string;
  duration: number;
  notificationTiming?: string[];
  status?: string;
}

export const eventService = {
  async getAll() {
    const response = await api.get('/events');
    return response.data;
  },

  async getById(id: number) {
    const response = await api.get(`/events/${id}`);
    return response.data;
  },

  async create(data: EventDTO) {
    const response = await api.post('/events', data);
    return response.data;
  },

  async update(id: number, data: Partial<EventDTO>) {
    const response = await api.put(`/events/${id}`, data);
    return response.data;
  },

  async delete(id: number) {
    const response = await api.delete(`/events/${id}`);
    return response.data;
  },

  async filter(params: Partial<EventDTO>) {
    const response = await api.get('/events/filter', { params });
    return response.data;
  },
};