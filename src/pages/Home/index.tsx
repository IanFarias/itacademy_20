import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import { GameContext } from '../../context/GameContext';
import { useContext } from 'react';
import './styles.css';
import { SCREEN_PATHS } from '../../routes';

const Home: React.FC = () => {
  const { createGame } = useContext(GameContext);
  const navigate = useNavigate();

  const handleClick = () => {
    createGame();
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
