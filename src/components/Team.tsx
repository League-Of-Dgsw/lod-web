import type { Team as Type } from "../types/team";

interface Props {
  data: Type;
}

const Team = ({ data }: Props) => {
  return (
    <div className="w-full bg-gray-50 rounded-lg p-2">
      <p className="py-2 border-b border-gray-300 text-lg font-semibold">{data.name}</p>
      <div className="w-full pt-2 flex flex-col gap-2">
        {data.members.map((item) => (
          <div className="w-full flex items-center justify-between">
            <p>{item.name}</p>
            <p className="text-xs text-black/80 bg-gray-200 rounded-full px-3 py-0.5">
              {item.rank}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Team;
