import { AnimatePresence } from 'framer-motion';
import { Navigate, Route, Routes as RoutesGroup, useLocation } from 'react-router-dom';

import App from '../App';

export function AnimatedRoutes() {
  const { auth } = { auth: true };
  const location = useLocation();

  const renderBasedOnAuthStatus = (Element?: JSX.Element) => {
    if (!Element) return auth ? <App /> : <div>Login</div>;

    return auth ? Element : <Navigate to={'/'} />;
  };

  return (
    <AnimatePresence mode="wait">
      <RoutesGroup location={location} key={location.pathname}>
        <Route path="/" element={renderBasedOnAuthStatus()} />
        <Route path="/group/:uuid" element={renderBasedOnAuthStatus()} />
        <Route path="/privateConversations/:uuid" element={renderBasedOnAuthStatus()} />
      </RoutesGroup>
    </AnimatePresence>
  );
}
