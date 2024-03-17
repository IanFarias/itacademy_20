import { ReactNode, createContext, useState } from 'react';
import Game from '../core/Game';

interface GameProviderProps {
  children: ReactNode;
}

interface GameContextData {
  game: Game | null;
  createGame: () => void;
}

export const GameContext = createContext({} as GameContextData);

export const GameProvider = ({ children }: GameProviderProps) => {
  const [game, setGame] = useState<Game | null>(null);

  const createGame = () => {
    setGame(new Game());
  };

  return (
    <GameContext.Provider value={{ game, createGame }}>
      {children}
    </GameContext.Provider>
  );
};
