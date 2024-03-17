import { Navigate, Outlet } from 'react-router-dom';
import { useContext } from 'react';
import { GameContext } from '../context/GameContext';
import { SCREEN_PATHS } from '.';

const PrivateRoutes = () => {
  const { game } = useContext(GameContext);

  return game ? <Outlet /> : <Navigate to={`${SCREEN_PATHS.initial}`} />;
};

export default PrivateRoutes;
