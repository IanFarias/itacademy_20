import { useContext, useState } from 'react';
import { GameContext } from '../../context/GameContext';
import Button from '../../components/Button';
import ModalAddBet from './components/ModalAddBet';
import { useNavigate } from 'react-router-dom';
import { SCREEN_PATHS } from '../../routes';
import './styles.css';

const Bets: React.FC = () => {
  const [openModal, setOpenModal] = useState(false);
  const { game } = useContext(GameContext);
  const navigate = useNavigate();

  const handleModal = () => {
    setOpenModal(!openModal);
  };

  const handleDraw = () => {
    return navigate(SCREEN_PATHS.draw);
  };

  return (
    <main className="container">
      <h1>Fase de Apostas</h1>

      <div className="bets__actions-container">
        <Button
          className="add-bet-btn"
          variant="secondary"
          onClick={handleModal}
        >
          Adicionar Aposta
        </Button>
        <Button
          className="add-bet-btn"
          onClick={handleDraw}
          disabled={game?.bets.length === 0}
        >
          Sortear
        </Button>
      </div>
      <div className="bet__table-container">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>CPF</th>
              <th>Aposta</th>
            </tr>
          </thead>
          <tbody>
            {game?.bets.map((bet, index) => {
              return (
                <tr key={`betlist-${index}`}>
                  <td> {bet.id}</td>
                  <td>{bet.name}</td>
                  <td>{bet.cpf}</td>
                  <td>|{bet.numbers.map((n) => `  ${n} |`)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <ModalAddBet isOpen={openModal} handleModal={handleModal} />
    </main>
  );
};

export default Bets;
