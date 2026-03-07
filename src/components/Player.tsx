import type { User } from "../types/player";

interface Props {
  data: User;
}

const Player = ({ data }: Props) => {
  return (
    <div className="w-full bg-gray-50 rounded-xl flex flex-col px-2">
      <p className="w-full py-2 pt-4 border-b border-gray-300">{data.name}</p>
      <p className="py-2 text-sm text-gray-400">{data.rank}</p>
    </div>
  );
};

export default Player;
