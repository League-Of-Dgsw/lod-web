import type { Team as Type } from "../types/team";

interface Props {
  data: Type;
}

const Team = ({ data }: Props) => {
  return (
    <div className="w-full border border-gray-200 p-3 hover:border-gray-400 transition-colors duration-150">
      <p className="pb-2 border-b border-gray-200 text-sm font-bold text-gray-900 truncate">
        {data.name}
      </p>
      <div className="w-full pt-2 flex flex-col gap-1.5">
        {data.members.map((item) => (
          <div key={item.name} className="w-full flex items-center justify-between">
            <p className="text-sm text-gray-800">{item.name}</p>
            <p className="text-xs text-gray-400">{item.rank}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Team;
