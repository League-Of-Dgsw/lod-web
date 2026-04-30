import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useGameStore } from "../stores/game";
import { useToast } from "@b1nd/dodam-design-system/components";
import Input from "./Input";
import { createApplication } from "../api/applications";

interface Props {
  onSuccess?: () => void;
}

const FaForm = ({ onSuccess }: Props) => {
  const { game } = useGameStore();
  const [tier, setTier] = useState("");
  const queryClient = useQueryClient();
  const toast = useToast();

  const { mutate, isPending } = useMutation({
    mutationFn: createApplication,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["applications"] });
      toast.success("FA 신청이 완료되었습니다.");
      onSuccess?.();
    },
    onError: () => {
      toast.error("FA 등록에 실패했습니다. 다시 시도해 주세요.");
    },
  });

  const handleSubmit = () => {
    if (!tier.trim()) {
      toast.error("티어를 입력해 주세요.");
      return;
    }
    if (!game) {
      toast.error("종목을 선택해 주세요.");
      return;
    }
    mutate({ gameId: parseInt(game.value), tier });
  };

  return (
    <div className="w-full max-w-105 mx-auto h-full flex flex-col gap-4">
      <h1 className="font-black text-lg tracking-tight text-gray-900">FA 등록하기</h1>
      <Input
        placeholder="ex) 다이아몬드 1"
        label={`${game?.name}의 경쟁전 랭크를 입력해 주세요.`}
        onChange={(e) => setTier(e.target.value)}
      />
      <div className="flex-1" />
      <button
        onClick={handleSubmit}
        disabled={isPending}
        className="w-full bg-gray-900 hover:bg-black active:opacity-80 py-3 text-white font-bold text-sm tracking-wide transition-all duration-150 cursor-pointer disabled:opacity-50">
        {isPending ? "등록 중..." : "등록하기"}
      </button>
    </div>
  );
};

export default FaForm;
