import { Routes as Switch, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Bets from '../pages/Bets';
import PrivateRoutes from './privateRoutes';
import Draw from '../pages/Draw';

export const SCREEN_PATHS = {
  initial: '',
  bets: '/bets',
  draw: '/draw',
};

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route path={SCREEN_PATHS.initial} element={<Home />} />
      {/* Private Routes  */}
      <Route element={<PrivateRoutes />}>
        <Route path={SCREEN_PATHS.bets} element={<Bets />} />
        <Route path={SCREEN_PATHS.draw} element={<Draw />} />
      </Route>
    </Switch>
  );
};

export default Routes;
