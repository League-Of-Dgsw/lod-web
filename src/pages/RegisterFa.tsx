import { Plus } from "lucide-react";
import { player } from "../constants/player";
import Player from "../components/Player";
import { Drawer } from "vaul";
import { useState } from "react";
import FaForm from "../components/FaForm";

const RegisterFa = () => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="w-full flex flex-col items-start gap-2">
      <button
        className="cursor-pointer active:scale-95 transition-all text-sm self-end flex items-center gap-1 bg-blue-500 px-4 py-1 rounded-lg text-white mb-2"
        onClick={() => setModalOpen(true)}>
        <Plus size={20} /> 등록하기
      </button>
      <div className="w-full grid grid-cols-3 gap-2">
        {player.map((item) => (
          <Player data={item} key={item.id} />
        ))}
      </div>
      <Drawer.Root open={modalOpen} onOpenChange={setModalOpen}>
        <Drawer.Portal>
          <Drawer.Overlay className="fixed inset-0 bg-black/40" />
          <Drawer.Content className="fixed bottom-0 left-0 right-0 bg-white p-6 rounded-t-4xl">
            <Drawer.Handle />
            <div className="h-[50svh] py-4">
              <FaForm />
            </div>
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>
    </div>
  );
};

export default RegisterFa;
