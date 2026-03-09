import { useGameStore } from "../stores/game";
import Input from "./Input";

const FaForm = () => {
  const { game } = useGameStore();

  return (
    <div className="w-full h-full flex flex-col gap-4">
      <h1 className="font-black text-lg tracking-tight text-gray-900">FA 등록하기</h1>
      <Input
        placeholder="ex) 다이아몬드 1"
        label={`${game?.name}의 경쟁전 랭크를 입력해 주세요.`}
      />
      <div className="flex-1" />
      <button className="w-full bg-gray-900 hover:bg-black active:opacity-80 py-3 text-white font-bold text-sm tracking-wide transition-all duration-150 cursor-pointer">
        등록하기
      </button>
    </div>
  );
};

export default FaForm;
