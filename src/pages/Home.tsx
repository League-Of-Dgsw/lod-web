import { useEffect, useState } from "react";
import Dropdown from "../components/Dropdown";
import type { Item } from "../types/item";
import { games } from "../constants/games";
import Segment from "../components/Segment";
import { tabs } from "../constants/tabs";
import RegisterFa from "./RegisterFa";
import Teams from "./Teams";
import { useGameStore } from "../stores/game";

const Home = () => {
  const { game, setGame } = useGameStore();
  const [tab, setTab] = useState<Item>(tabs[0]);

  useEffect(() => {
    setGame(games[0]);
  }, []);

  return (
    <div className="w-full flex flex-col gap-2">
      <Dropdown onChange={setGame} selected={game!} items={games} />
      <Segment items={tabs} onChange={setTab} selected={tab} />
      <div />
      {tab.value === "register-fa" ? <RegisterFa /> : <Teams />}
    </div>
  );
};

export default Home;
