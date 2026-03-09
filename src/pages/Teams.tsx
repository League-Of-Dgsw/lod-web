import { Plus } from "lucide-react";
import { useState } from "react";
import { teams } from "../constants/teams";
import Team from "../components/Team";
import { Drawer } from "vaul";
import TeamForm from "../components/TeamForm";

const Teams = () => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="w-full flex flex-col items-start gap-2">
      <button
        className="cursor-pointer active:opacity-70 transition-opacity text-xs self-end flex items-center gap-1.5 border border-gray-900 text-gray-900 font-bold tracking-wide px-4 py-2 mb-2"
        onClick={() => setModalOpen(true)}>
        <Plus size={16} /> 팀 등록
      </button>
      <div className="w-full grid grid-cols-3 gap-2">
        {teams.map((item) => (
          <Team data={item} key={item.id} />
        ))}
      </div>
      <Drawer.Root open={modalOpen} onOpenChange={setModalOpen}>
        <Drawer.Portal>
          <Drawer.Overlay className="fixed inset-0 bg-black/40" />
          <Drawer.Content className="fixed bottom-0 left-0 right-0 bg-white p-6 rounded-t-3xl shadow-2xl">
            <Drawer.Handle />
            <div className="h-[90svh] py-4">
              <TeamForm />
            </div>
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>
    </div>
  );
};

export default Teams;
