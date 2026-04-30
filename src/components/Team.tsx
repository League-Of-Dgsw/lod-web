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
    <div className="w-full border border-border-normal p-3 hover:border-border-strong transition-colors duration-150">
      <div className="pb-2 border-b border-border-normal flex items-center justify-between gap-1">
        <p className="text-sm font-bold text-text-primary truncate">{data.name}</p>
        {isLeader && (
          <div className="flex items-center gap-1 shrink-0">
            <button
              onClick={onEdit}
              className="p-1 text-text-placeholder hover:text-text-secondary transition-colors cursor-pointer">
              <Pencil size={13} />
            </button>
            <button
              onClick={onDelete}
              className="p-1 text-text-placeholder hover:text-status-error transition-colors cursor-pointer">
              <Trash2 size={13} />
            </button>
          </div>
        )}
      </div>
      <div className="w-full pt-2 flex flex-col gap-1.5">
        {data.members.map((item) => (
          <div key={item.id} className="w-full flex items-center justify-between">
            <p className="text-sm text-text-secondary">{item.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Team;
