import api from '../lib/api';
import type { User } from '../types/player';

export const getUsers = () => api.get<User[]>('/users').then(r => r.data);
export const getMe = () => api.get<User>('/users/me').then(r => r.data);
export const getUser = (id: number) => api.get<User>(`/users/${id}`).then(r => r.data);
export const createUser = (studentId: string, name: string) =>
  api.post<User>('/users', { studentId, name }).then(r => r.data);
