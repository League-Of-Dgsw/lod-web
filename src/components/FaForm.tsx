import { useGameStore } from "../stores/game";
import Input from "./Input";

const FaForm = () => {
  const { game } = useGameStore();

  return (
    <div className="w-full h-full flex flex-col gap-4">
      <h1 className="font-semibold text-xl">FA 등록하기</h1>
      <Input
        placeholder="ex) 다이아몬드 1"
        label={`${game?.name}의 경쟁전 랭크를 입력해 주세요.`}
      />
      <div className="flex-1" />
      <button className="w-full bg-blue-500 rounded-lg py-2 text-white active:scale-95 transition-transform cursor-pointer">
        등록하기
      </button>
    </div>
  );
};

export default FaForm;
