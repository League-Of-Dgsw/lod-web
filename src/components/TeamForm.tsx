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
    <div className="w-full max-w-105 mx-auto h-full flex flex-col gap-4">
      <h1 className="font-black text-lg tracking-tight text-gray-900">팀 등록하기</h1>
      <Input
        placeholder="ex) SKT T1"
        label="팀 이름을 입력해 주세요"
        onChange={(e) => setName(e.target.value)}
        name={name}
      />
      <div className="w-full flex flex-col gap-2">
        <h2 className="text-xs font-semibold tracking-wide text-gray-500 uppercase">팀원 추가</h2>
        <Input
          placeholder="이름으로 검색..."
          onChange={(e) => setQuery(e.target.value)}
          value={query}
        />
        <div className="w-full h-52 border border-gray-200 overflow-y-scroll">
          {filtered.length > 0 ? (
            filtered.map((item, idx, arr) => (
              <div
                key={item.id}
                className={`w-full flex items-center justify-between px-3 py-2.5 hover:bg-gray-50 transition-colors duration-100 ${
                  arr.length - 1 !== idx ? "border-b border-gray-100" : ""
                }`}>
                <div>
                  <p className="text-sm font-medium text-gray-800">{item.name}</p>
                  <p className="text-xs text-gray-400">{item.rank}</p>
                </div>
                {selected.find((p) => p.id === item.id) ? (
                  <span className="text-xs text-gray-400">추가됨</span>
                ) : (
                  <button
                    className="outline-none p-1 border border-gray-300 hover:border-gray-900 text-gray-700 active:bg-gray-100 transition-all duration-100 cursor-pointer"
                    onClick={() => handleSelect(item)}>
                    <Plus size={13} />
                  </button>
                )}
              </div>
            ))
          ) : (
            <div className="w-full h-full flex items-center justify-center text-sm text-gray-400">
              검색 결과가 없습니다.
            </div>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="text-xs font-semibold tracking-wide text-gray-500 uppercase">팀원 목록</h2>
          <div className="w-full min-h-10 flex items-start justify-start gap-1.5 flex-wrap">
            {selected.length > 0 ? (
              selected.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-1 items-center border border-gray-200 hover:border-gray-400 px-2.5 py-1 cursor-pointer transition-colors duration-150"
                  onClick={() => handleDelete(item)}>
                  <p className="text-xs text-gray-700">{item.name}</p>
                  <X size={12} className="text-gray-400" />
                </div>
              ))
            ) : (
              <div className="w-full text-center text-sm text-gray-400 py-2">
                추가된 팀원이 없습니다.
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="flex-1" />
      <button className="w-full bg-gray-900 hover:bg-black active:opacity-80 py-3 text-white font-bold text-sm tracking-wide transition-all duration-150 cursor-pointer">
        등록하기
      </button>
    </div>
  );
};

export default TeamForm;
