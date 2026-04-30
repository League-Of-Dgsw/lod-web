import { Plus } from "lucide-react";
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@b1nd/dodam-design-system/components";
import { Drawer } from "vaul";
import Team from "../components/Team";
import TeamForm from "../components/TeamForm";
import Input from "../components/Input";
import { useGameStore } from "../stores/game";
import { getTeams, updateTeam, deleteTeam } from "../api/teams";
import { getMe } from "../api/users";
import type { Team as TeamType } from "../types/team";

const Teams = () => {
  const [createOpen, setCreateOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<TeamType | null>(null);
  const [editName, setEditName] = useState("");
  const { game } = useGameStore();
  const gameId = game ? parseInt(game.value) : undefined;
  const queryClient = useQueryClient();
  const toast = useToast();

  const { data: teams = [] } = useQuery({
    queryKey: ["teams", gameId],
    queryFn: () => getTeams(gameId),
    enabled: !!gameId,
  });

  const { data: me } = useQuery({
    queryKey: ["me"],
    queryFn: getMe,
  });

  const { mutate: execUpdate, isPending: isUpdating } = useMutation({
    mutationFn: () => updateTeam(editTarget!.id, editName),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["teams"] });
      toast.success("팀 이름이 수정되었습니다.");
      setEditTarget(null);
    },
    onError: () => toast.error("팀 수정에 실패했습니다."),
  });

  const { mutate: execDelete } = useMutation({
    mutationFn: deleteTeam,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["teams"] });
      toast.success("팀이 삭제되었습니다.");
    },
    onError: () => toast.error("팀 삭제에 실패했습니다."),
  });

  const handleEditOpen = (team: TeamType) => {
    setEditTarget(team);
    setEditName(team.name);
  };

  const handleDelete = (team: TeamType) => {
    if (!window.confirm(`"${team.name}" 팀을 삭제하시겠습니까?`)) return;
    execDelete(team.id);
  };

  return (
    <div className="w-full flex flex-col items-start gap-2">
      <button
        className="cursor-pointer active:opacity-70 transition-opacity text-xs self-end flex items-center gap-1.5 border border-gray-900 text-gray-900 font-bold tracking-wide px-4 py-2 mb-2"
        onClick={() => setCreateOpen(true)}>
        <Plus size={16} /> 팀 등록
      </button>
      <div className="w-full grid grid-cols-3 gap-2">
        {teams.map((item) => (
          <Team
            data={item}
            key={item.id}
            isLeader={!!me && item.leaderId === me.id}
            onEdit={() => handleEditOpen(item)}
            onDelete={() => handleDelete(item)}
          />
        ))}
      </div>

      {/* 팀 등록 Drawer */}
      <Drawer.Root open={createOpen} onOpenChange={setCreateOpen}>
        <Drawer.Portal>
          <Drawer.Overlay className="fixed inset-0 bg-black/40" />
          <Drawer.Content className="fixed bottom-0 left-0 right-0 bg-white p-6 rounded-t-3xl shadow-2xl">
            <Drawer.Handle />
            <div className="h-[90svh] py-4">
              <TeamForm onSuccess={() => setCreateOpen(false)} />
            </div>
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>

      {/* 팀 수정 Drawer */}
      <Drawer.Root open={!!editTarget} onOpenChange={(open) => !open && setEditTarget(null)}>
        <Drawer.Portal>
          <Drawer.Overlay className="fixed inset-0 bg-black/40" />
          <Drawer.Content className="fixed bottom-0 left-0 right-0 bg-white p-6 rounded-t-3xl shadow-2xl">
            <Drawer.Handle />
            <div className="py-4 flex flex-col gap-4 max-w-105 mx-auto">
              <h1 className="font-black text-lg tracking-tight text-gray-900">팀 이름 수정</h1>
              <Input
                label="새 팀 이름"
                placeholder="ex) SKT T1"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
              />
              <button
                onClick={() => execUpdate()}
                disabled={isUpdating || !editName.trim()}
                className="w-full bg-gray-900 hover:bg-black active:opacity-80 py-3 text-white font-bold text-sm tracking-wide transition-all duration-150 cursor-pointer disabled:opacity-50">
                {isUpdating ? "수정 중..." : "수정하기"}
              </button>
            </div>
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>
    </div>
  );
};

export default Teams;
