import { Routes as Switch, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Bets from '../pages/Bets';
import PrivateRoutes from './privateRoutes';

export const SCREEN_PATHS = {
  initial: '',
  bets: '/bets',
};

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route path={SCREEN_PATHS.initial} element={<Home />} />
      {/* Private Routes  */}
      <Route element={<PrivateRoutes />}>
        <Route path={SCREEN_PATHS.bets} element={<Bets />} />
      </Route>
    </Switch>
  );
};

export default Routes;
