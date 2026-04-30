import type { Team } from "../types/team";
import { player } from "./player";

export const teams: Team[] = [
  {
    id: 1,
    name: "바로가보자고",
    gameId: 1,
    leaderId: 1,
    members: player,
  },
];
