import { Plus, X } from "lucide-react";
import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { User } from "../types/player";
import { useToast, FilledTextField, FilledButton, IconButton } from "@b1nd/dodam-design-system/components";
import { getUsers, getMe } from "../api/users";
import { createTeam } from "../api/teams";
import { useGameStore } from "../stores/game";

interface Props {
  onSuccess?: () => void;
}

const TeamForm = ({ onSuccess }: Props) => {
  const [selected, setSelected] = useState<User[]>([]);
  const [name, setName] = useState("");
  const [query, setQuery] = useState("");
  const { game } = useGameStore();
  const queryClient = useQueryClient();
  const toast = useToast();

  const { data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });

  const { data: me } = useQuery({
    queryKey: ["me"],
    queryFn: getMe,
  });

  useEffect(() => {
    if (me && !selected.find((u) => u.id === me.id)) {
      setSelected([me]);
    }
  }, [me]);

  const filtered = users.filter((item) => item.name.includes(query.trim()));

  const { mutate, isPending } = useMutation({
    mutationFn: createTeam,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["teams"] });
      toast.success("팀이 성공적으로 등록되었습니다.");
      onSuccess?.();
    },
    onError: () => {
      toast.error("팀 등록에 실패했습니다. 다시 시도해 주세요.");
    },
  });

  const handleSelect = (user: User) => {
    if (!selected.find((item) => item.id === user.id)) {
      setSelected((prev) => [...prev, user]);
    } else {
      toast.error("이미 추가된 팀원입니다.");
    }
  };

  const handleDelete = (user: User) => {
    if (me && user.id === me.id) return;
    setSelected((prev) => prev.filter((item) => item.id !== user.id));
  };

  const handleSubmit = () => {
    if (!name.trim()) {
      toast.error("팀 이름을 입력해 주세요.");
      return;
    }
    if (!game) {
      toast.error("종목을 선택해 주세요.");
      return;
    }
    if (selected.length !== 5) {
      toast.error("팀원 5명을 정확히 선택해 주세요.");
      return;
    }
    mutate({
      name,
      gameId: parseInt(game.value),
      members: selected.filter((m) => m.id !== me!.id).map((m) => ({ studentId: m.studentId })),
    });
  };

  return (
    <div className="w-full max-w-105 mx-auto h-full flex flex-col gap-4">
      <h1 className="font-black text-lg tracking-tight text-text-primary">팀 등록하기</h1>
      <FilledTextField
        type="text"
        label="팀 이름을 입력해 주세요"
        placeholder="ex) SKT T1"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <div className="w-full flex flex-col gap-2">
        <h2 className="text-xs font-semibold tracking-wide text-text-tertiary uppercase">팀원 추가 (5명)</h2>
        <FilledTextField
          type="text"
          label=""
          placeholder="이름으로 검색..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <div className="w-full h-52 border border-border-normal overflow-y-scroll">
          {filtered.length > 0 ? (
            filtered.map((item, idx, arr) => (
              <div
                key={item.id}
                className={`w-full flex items-center justify-between px-3 py-2.5 hover:bg-fill-primary transition-colors duration-100 ${
                  arr.length - 1 !== idx ? "border-b border-border-subtle" : ""
                }`}>
                <div>
                  <p className="text-sm font-medium text-text-secondary">{item.name}</p>
                  <p className="text-xs text-text-placeholder">{item.studentId}</p>
                </div>
                {selected.find((p) => p.id === item.id) ? (
                  <span className="text-xs text-text-placeholder">추가됨</span>
                ) : (
                  <IconButton
                    icon={<Plus size={13} />}
                    size={28}
                    iconSize={13}
                    onClick={() => handleSelect(item)}
                  />
                )}
              </div>
            ))
          ) : (
            <div className="w-full h-full flex items-center justify-center text-sm text-text-placeholder">
              검색 결과가 없습니다.
            </div>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="text-xs font-semibold tracking-wide text-text-tertiary uppercase">팀원 목록 ({selected.length}/5)</h2>
          <div className="w-full min-h-10 flex items-start justify-start gap-1.5 flex-wrap">
            {selected.length > 0 ? (
              selected.map((item) => {
                const isMe = !!me && item.id === me.id;
                return (
                  <div
                    key={item.id}
                    className={`flex gap-1 items-center border px-2.5 py-1 transition-colors duration-150 ${
                      isMe
                        ? "border-border-normal cursor-default"
                        : "border-border-normal hover:border-border-strong cursor-pointer"
                    }`}
                    onClick={() => handleDelete(item)}>
                    <p className="text-xs text-text-secondary">{item.name}</p>
                    {!isMe && <X size={12} className="text-text-placeholder" />}
                  </div>
                );
              })
            ) : (
              <div className="w-full text-center text-sm text-text-placeholder py-2">
                추가된 팀원이 없습니다.
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="flex-1" />
      <FilledButton
        role="primary"
        size="large"
        display="inline"
        buttonCustomStyle={{ width: "100%", boxSizing: "border-box" }}
        onClick={handleSubmit}
        disabled={isPending}>
        {isPending ? "등록 중..." : "등록하기"}
      </FilledButton>
    </div>
  );
};

export default TeamForm;
