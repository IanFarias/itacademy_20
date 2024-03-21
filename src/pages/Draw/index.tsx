import { useContext, useState } from 'react';
import { GameContext } from '../../context/GameContext';
import { ICountingResult, Status } from '../../core/Game';
import Button from '../../components/Button';
import './styles.css';

const Draw: React.FC = () => {
  const [feedback, setFeedback] = useState<string>('');
  const [result, setResult] = useState<ICountingResult | null>(null);
  const { game, setGame } = useContext(GameContext);

  const handleDraw = async () => {
    if (game) {
      setFeedback('Sorteando...');
      await game?.draw(5);

      setFeedback('Apuração...');
      let isFinished = await game?.counting();

      while (isFinished !== Status.END) {
        setFeedback('Sorteando Novamente...');
        await game?.draw(1);

        setFeedback('Apuração...');
        isFinished = await game?.counting();
      }

      setFeedback('');
      setResult(game.result());
    }
  };

  const handleRestart = () => {
    setGame(null);
  };

  return (
    <main className="container end-main">
      {game?.status === Status.END ? (
        <h1>Resultado Final</h1>
      ) : (
        <h1>Fase de Sorteio</h1>
      )}

      {feedback && <h2>{feedback}</h2>}
      {game?.status === Status.BETTING_PHASE && (
        <Button onClick={handleDraw}>Iniciar Sorteio</Button>
      )}

      {result && (
        <>
          <h2>Números Sorteados:</h2>
          <div className="end__table-container numbersDrawn-table-container">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Números Sorteados</th>
                </tr>
              </thead>
              <tbody>
                {result.numbersDrawn.map((number, index) => {
                  return (
                    <tr key={`numbersDrawn-${index}`}>
                      <td>{number}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <ul>
            <li>Quantidade de rodadas: {result.drawingRounds}</li>
            <li>Quantidade de ganhadores: {result.numberOfWinners}</li>
          </ul>
          <h2>Apostas Ganhadoras:</h2>
          {result.winners.length > 0 ? (
            <div className="end__table-container">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Nome</th>
                    <th>CPF</th>
                    <th>Aposta</th>
                    <th>Prêmio</th>
                  </tr>
                </thead>
                <tbody>
                  {result.winners.map((bet, index) => {
                    return (
                      <tr key={`winnerslist-${index}`}>
                        <td> {bet.id}</td>
                        <td>{bet.name}</td>
                        <td>{bet.cpf}</td>
                        <td>|{bet.numbers.map((n) => `  ${n} |`)}</td>
                        <td>{result.prize}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <h3 style={{ color: '#ea5455' }}>Não Houve Vencedores!</h3>
          )}
          <h2>Números Apostados: </h2>
          <div className="end__table-container">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Número</th>
                  <th>Quantidade de Apostas</th>
                </tr>
              </thead>
              <tbody>
                {result.allNumbersBet.map((numberBet, index) => {
                  return (
                    <tr key={`numberBet-${index}`}>
                      <td> {numberBet.number}</td>
                      <td>{numberBet.occurences}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <Button onClick={handleRestart}>Iniciar Novamente</Button>
        </>
      )}
    </main>
  );
};

export default Draw;
