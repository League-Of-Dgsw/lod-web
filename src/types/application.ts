import type { User } from './player';

export interface Application {
  id: number;
  userId: number;
  gameId: number;
  tier: string;
  description?: string;
  user?: User;
}

export interface CreateApplicationBody {
  gameId: number;
  tier: string;
  description?: string;
}
