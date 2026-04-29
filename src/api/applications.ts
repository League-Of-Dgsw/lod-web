import api from '../lib/api';
import type { Application, CreateApplicationBody } from '../types/application';

export const getApplications = (gameId?: number) =>
  api.get<Application[]>('/applications', { params: gameId ? { gameId } : {} }).then(r => r.data);

export const createApplication = (body: CreateApplicationBody) =>
  api.post<Application>('/applications', body).then(r => r.data);

export const deleteApplication = (id: number) =>
  api.delete(`/applications/${id}`).then(r => r.data);
