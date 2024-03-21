import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import { GameContext } from '../../context/GameContext';
import { useContext, useEffect } from 'react';
import { SCREEN_PATHS } from '../../routes';
import './styles.css';

const Home: React.FC = () => {
  const { createGame, start } = useContext(GameContext);
  const navigate = useNavigate();

  useEffect(() => {
    createGame();
  }, []);

  const handleClick = () => {
    start();
    return navigate(SCREEN_PATHS.bets);
  };

  return (
    <main className="container h-main">
      <h1>Controlador de Apostas</h1>
      <h2>Exercício Técnico - IT Academy 20</h2>
      <Button className="h-btn" type="button" onClick={handleClick}>
        Iniciar
      </Button>
    </main>
  );
};

export default Home;
