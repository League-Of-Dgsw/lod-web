import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Dropdown, Tab } from "@b1nd/dodam-design-system/components";
import { useGameStore } from "../stores/game";
import { getGames } from "../api/games";
import RegisterFa from "./RegisterFa";
import Teams from "./Teams";

const Home = () => {
  const { game, setGame } = useGameStore();
  const [tabIndex, setTabIndex] = useState(0);

  const { data: games = [] } = useQuery({
    queryKey: ["games"],
    queryFn: getGames,
  });

  const gameItems = games.map((g) => ({ name: g.name, value: g.id.toString() }));

  useEffect(() => {
    if (gameItems.length > 0 && !game) {
      setGame(gameItems[0]);
    }
  }, [gameItems.length]);

  return (
    <div className="w-full flex flex-col gap-2">
      {gameItems.length > 0 && (
        <Dropdown
          items={gameItems}
          value={game?.value ?? gameItems[0]?.value ?? ""}
          onSelectedItemChange={setGame}
        />
      )}
      <Tab onChange={setTabIndex} fluid>
        <Tab.Item selected={tabIndex === 0} onClick={() => setTabIndex(0)}>FA 등록</Tab.Item>
        <Tab.Item selected={tabIndex === 1} onClick={() => setTabIndex(1)}>팀 등록 현황</Tab.Item>
      </Tab>
      <div />
      {tabIndex === 0 ? <RegisterFa /> : <Teams />}
    </div>
  );
};

export default Home;
