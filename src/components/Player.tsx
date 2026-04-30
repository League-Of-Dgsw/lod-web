import type { Application } from "../types/application";

interface Props {
  data: Application;
}

const Player = ({ data }: Props) => {
  return (
    <div className="w-full border border-border-normal flex flex-col px-3 py-3 hover:border-border-strong transition-colors duration-150">
      <p className="text-sm font-semibold text-text-primary truncate mb-1.5">
        {data.user?.name ?? `User #${data.userId}`}
      </p>
      <p className="text-xs text-text-placeholder">{data.tier}</p>
    </div>
  );
};

export default Player;
