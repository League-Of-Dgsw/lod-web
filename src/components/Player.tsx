import type { User } from "../types/player";

interface Props {
  data: User;
}

const Player = ({ data }: Props) => {
  return (
    <div className="w-full border border-gray-200 flex flex-col px-3 py-3 hover:border-gray-400 transition-colors duration-150">
      <p className="text-sm font-semibold text-gray-900 truncate mb-1.5">
        {data.name}
      </p>
      <p className="text-xs text-gray-400">{data.rank}</p>
    </div>
  );
};

export default Player;
