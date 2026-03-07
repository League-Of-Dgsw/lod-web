import { Plus, X } from "lucide-react";
import { player } from "../constants/player";
import Input from "./Input";
import { useState } from "react";
import type { User } from "../types/player";
import { toast } from "@cher1shrxd/toast";

const TeamForm = () => {
  const [selected, setSelected] = useState<User[]>([]);
  const [name, setName] = useState("");
  const [query, setQuery] = useState("");
  const filtered = player.filter((item) => item.name.includes(query.trim()));

  const handleSelect = (user: User) => {
    if (!selected.find((item) => item.id === user.id)) {
      setSelected((prev) => [...prev, user]);
    } else {
      toast.error("팀원 추가 실패", "이미 추가된 팀원입니다.");
    }
  };

  const handleDelete = (user: User) => {
    setSelected((prev) => prev.filter((item) => item.id !== user.id));
  };

  return (
    <div className="w-full h-full flex flex-col gap-4">
      <h1 className="font-semibold text-xl">팀 등록하기</h1>
      <Input
        placeholder="ex) SKT T1"
        label="팀 이름을 입력해 주세요"
        onChange={(e) => setName(e.target.value)}
        name={name}
      />
      <div className="w-full mt-4 flex flex-col">
        <h2 className="text-sm text-black/80">팀원 추가</h2>
        <Input
          placeholder="검색할 사용자의 이름을 입력하세요."
          onChange={(e) => setQuery(e.target.value)}
          value={query}
        />
        <div className="w-full h-55 bg-gray-50 rounded-lg overflow-y-scroll">
          <div className="w-full py-2">
            {filtered.length > 0 ? (
              filtered.map((item) => (
                <div className="w-full flex items-center justify-between px-4 py-2">
                  <p>{item.name}</p>
                  {!selected.find((p) => p.id === item.id) && (
                    <button
                      className="outline-none px-2 py-1 bg-blue-500 text-white rounded-lg active:scale-95 transition-all cursor-pointer"
                      onClick={() => handleSelect(item)}>
                      <Plus size={16} />
                    </button>
                  )}
                </div>
              ))
            ) : (
              <div className="w-full text-center text-black/60 pt-2">
                검색 결과가 없습니다.
              </div>
            )}
          </div>
        </div>
        <h2 className="text-sm text-black/80 mt-4">팀원 목록</h2>
        <div className="w-full flex items-start justify-start gap-2 flex-wrap mt-2">
          {selected.length > 0 ? (
            selected.map((item) => (
              <div
                className="flex gap-1 items-center bg-gray-50 px-2 py-0.5 rounded-full cursor-pointer"
                onClick={() => handleDelete(item)}>
                <p className="text-sm text-black/80">{item.name}</p>
                <X size={16} className="text-black/40" />
              </div>
            ))
          ) : (
            <div className="w-full text-center text-black/60">
              추가된 팀원이 없습니다.
            </div>
          )}
        </div>
      </div>
      <div className="flex-1" />
      <button className="w-full bg-blue-500 rounded-lg py-2 text-white active:scale-95 transition-transform cursor-pointer">
        등록하기
      </button>
    </div>
  );
};

export default TeamForm;
