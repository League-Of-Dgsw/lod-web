import { Plus } from "lucide-react";
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast, IconButton } from "@b1nd/dodam-design-system/components";
import { Drawer } from "vaul";
import Team from "../components/Team";
import TeamForm from "../components/TeamForm";
import { useGameStore } from "../stores/game";
import { getTeams, deleteTeam } from "../api/teams";
import { getMe } from "../api/users";
import type { Team as TeamType } from "../types/team";

const Teams = () => {
  const [createOpen, setCreateOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<TeamType | null>(null);
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

  const { mutate: execDelete } = useMutation({
    mutationFn: deleteTeam,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["teams"] });
      toast.success("팀이 삭제되었습니다.");
    },
    onError: () => toast.error("팀 삭제에 실패했습니다."),
  });

  const handleDelete = (team: TeamType) => {
    if (!window.confirm(`"${team.name}" 팀을 삭제하시겠습니까?`)) return;
    execDelete(team.id);
  };

  return (
    <div className="w-full flex flex-col items-start gap-2">
      <div className="self-end mb-2">
        <IconButton
          icon={<Plus size={16} />}
          onClick={() => setCreateOpen(true)}
        />
      </div>
      <div className="w-full grid grid-cols-3 gap-2">
        {teams.map((item) => (
          <Team
            data={item}
            key={item.id}
            isLeader={!!me && item.leaderId === me.id}
            onEdit={() => setEditTarget(item)}
            onDelete={() => handleDelete(item)}
          />
        ))}
      </div>

      {/* 팀 등록 Drawer */}
      <Drawer.Root open={createOpen} onOpenChange={setCreateOpen}>
        <Drawer.Portal>
          <Drawer.Overlay className="fixed inset-0 bg-static-black/40" />
          <Drawer.Content className="fixed bottom-0 left-0 right-0 bg-background-surface p-6 rounded-t-3xl shadow-2xl">
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
          <Drawer.Overlay className="fixed inset-0 bg-static-black/40" />
          <Drawer.Content className="fixed bottom-0 left-0 right-0 bg-background-surface p-6 rounded-t-3xl shadow-2xl">
            <Drawer.Handle />
            <div className="h-[90svh] py-4">
              {editTarget && (
                <TeamForm
                  initialTeam={editTarget}
                  onSuccess={() => setEditTarget(null)}
                />
              )}
            </div>
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>
    </div>
  );
};

export default Teams;
