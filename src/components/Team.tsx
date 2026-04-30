import { Pencil, Trash2 } from "lucide-react";
import type { Team as Type } from "../types/team";

interface Props {
  data: Type;
  isLeader?: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
}

const Team = ({ data, isLeader, onEdit, onDelete }: Props) => {
  return (
    <div className="w-full border border-gray-200 p-3 hover:border-gray-400 transition-colors duration-150">
      <div className="pb-2 border-b border-gray-200 flex items-center justify-between gap-1">
        <p className="text-sm font-bold text-gray-900 truncate">{data.name}</p>
        {isLeader && (
          <div className="flex items-center gap-1 shrink-0">
            <button
              onClick={onEdit}
              className="p-1 text-gray-400 hover:text-gray-700 transition-colors cursor-pointer">
              <Pencil size={13} />
            </button>
            <button
              onClick={onDelete}
              className="p-1 text-gray-400 hover:text-red-500 transition-colors cursor-pointer">
              <Trash2 size={13} />
            </button>
          </div>
        )}
      </div>
      <div className="w-full pt-2 flex flex-col gap-1.5">
        {data.members.map((item) => (
          <div key={item.id} className="w-full flex items-center justify-between">
            <p className="text-sm text-gray-800">{item.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Team;
