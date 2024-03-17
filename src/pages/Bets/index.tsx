import { useContext, useState } from 'react';
import { GameContext } from '../../context/GameContext';
import Button from '../../components/Button';
import ModalAddBet from './components/ModalAddBet';
import './styles.css';

const Bets: React.FC = () => {
  const [openModal, setOpenModal] = useState(false);
  const { game } = useContext(GameContext);

  const handleModal = () => {
    setOpenModal(!openModal);
  };

  const handleFinishBets = () => {};

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
        <Button className="add-bet-btn" onClick={handleFinishBets}>
          Sortear
        </Button>
      </div>
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
      <ModalAddBet isOpen={openModal} handleModal={handleModal} />
    </main>
  );
};

export default Bets;
