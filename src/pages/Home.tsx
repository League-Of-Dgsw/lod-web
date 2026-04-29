import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Dropdown from "../components/Dropdown";
import type { Item } from "../types/item";
import Segment from "../components/Segment";
import { tabs } from "../constants/tabs";
import RegisterFa from "./RegisterFa";
import Teams from "./Teams";
import { useGameStore } from "../stores/game";
import { getGames } from "../api/games";

const Home = () => {
  const { game, setGame } = useGameStore();
  const [tab, setTab] = useState<Item>(tabs[0]);

  const { data: games = [] } = useQuery({
    queryKey: ["games"],
    queryFn: getGames,
  });

  const gameItems: Item[] = games.map((g) => ({ name: g.name, value: g.id.toString() }));

  useEffect(() => {
    if (gameItems.length > 0 && !game) {
      setGame(gameItems[0]);
    }
  }, [gameItems.length]);

  return (
    <div className="w-full flex flex-col gap-2">
      {gameItems.length > 0 && (
        <Dropdown onChange={setGame} selected={game ?? gameItems[0]} items={gameItems} />
      )}
      <Segment items={tabs} onChange={setTab} selected={tab} />
      <div />
      {tab.value === "register-fa" ? <RegisterFa /> : <Teams />}
    </div>
  );
};

export default Home;
