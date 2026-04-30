import type { User } from './player';
import type { Game } from './game';

export interface TeamMember {
  id: number;
  teamId: number;
  userId: number;
  user: User;
}

export interface Team {
  id: number;
  name: string;
  gameId: number;
  leaderId: number;
  game: Game;
  members: TeamMember[];
  leader: {
    id: number;
    name: string;
    studentId: string;
  };
}

export interface CreateTeamBody {
  name: string;
  gameId: number;
  members: { studentId: string }[];
}

export interface UpdateTeamBody {
  name: string;
  members: { studentId: string }[];
}
