import type { User } from './player';

export interface Team {
  id: number;
  name: string;
  gameId: number;
  leaderId: number;
  members: User[];
}

export interface CreateTeamBody {
  name: string;
  gameId: number;
  members: { name: string }[];
}
