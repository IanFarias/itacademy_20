import { BrowserRouter } from 'react-router-dom';
import Routes from './routes';
import { GameProvider } from './context/GameContext';

const App = () => {
  return (
    <GameProvider>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </GameProvider>
  );
};

export default App;
