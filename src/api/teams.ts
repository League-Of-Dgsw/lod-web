import api from '../lib/api';
import type { Team, CreateTeamBody } from '../types/team';

export const getTeams = (gameId?: number) =>
  api.get<Team[]>('/teams', { params: gameId ? { gameId } : {} }).then(r => r.data);

export const getTeam = (id: number) => api.get<Team>(`/teams/${id}`).then(r => r.data);

export const createTeam = (body: CreateTeamBody) =>
  api.post<Team>('/teams', body).then(r => r.data);

export const updateTeam = (id: number, name: string) =>
  api.patch<Team>(`/teams/${id}`, { name }).then(r => r.data);

export const deleteTeam = (id: number) => api.delete(`/teams/${id}`).then(r => r.data);
