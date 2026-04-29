import api from '../lib/api';
import type { Game } from '../types/game';

export const getGames = () => api.get<Game[]>('/games').then(r => r.data);
export const createGame = (name: string) => api.post<Game>('/games', { name }).then(r => r.data);
export const deleteGame = (id: number) => api.delete(`/games/${id}`).then(r => r.data);
