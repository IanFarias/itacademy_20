import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from 'react';
import Game, { Status } from '../core/Game';

interface GameProviderProps {
  children: ReactNode;
}

interface GameContextData {
  game: Game | null;
  createGame: () => void;
  start: () => void;
  setGame: Dispatch<SetStateAction<Game | null>>;
}

export const GameContext = createContext({} as GameContextData);

export const GameProvider = ({ children }: GameProviderProps) => {
  const [game, setGame] = useState<Game | null>(null);

  const createGame = () => {
    setGame(new Game());
  };

  const start = () => {
    if (game) {
      game.status = Status.BETTING_PHASE;
    }
  };

  return (
    <GameContext.Provider value={{ game, createGame, start, setGame }}>
      {children}
    </GameContext.Provider>
  );
};
