import type { User } from "./player";

export interface Team {
  id: number;
  name: string;
  members: User[];
}