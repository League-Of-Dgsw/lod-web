import type { Team } from "../types/team";
import { player } from "./player";

export const teams: Team[] = [
  {
    id: 1,
    name: "바로가보자고",
    gameId: 1,
    leaderId: 1,
    game: {
      id: 1,
      name: "리그오브레전드",
    },
    members: player.map((p, idx) => ({
      id: idx + 1,
      teamId: 1,
      userId: p.id,
      user: p,
    })),
    leader: {
      id: player[0].id,
      name: player[0].name,
      studentId: player[0].studentId,
    },
  },
];
