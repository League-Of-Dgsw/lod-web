import type { Application } from "../types/application";

interface Props {
  data: Application;
}

const Player = ({ data }: Props) => {
  return (
    <div className="w-full border border-gray-200 flex flex-col px-3 py-3 hover:border-gray-400 transition-colors duration-150">
      <p className="text-sm font-semibold text-gray-900 truncate mb-1.5">
        {data.user?.name ?? `User #${data.userId}`}
      </p>
      <p className="text-xs text-gray-400">{data.tier}</p>
    </div>
  );
};

export default Player;
