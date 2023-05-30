import { AnimatePresence } from 'framer-motion';
import { Navigate, Route, Routes as RoutesGroup, useLocation } from 'react-router-dom';

import App from '../App';
import { HStack } from '../components/HStack';
import { NavBar } from '../components/NavBar';
import { PrivateConversationChat } from '../pages/PrivateConversationChat';

export function AnimatedRoutes() {
  const auth = true;
  const location = useLocation();

  const renderBasedOnAuthStatus = (Element?: JSX.Element) => {
    if (!Element) return auth ? <App /> : <div>Login</div>;

    return auth ? Element : <Navigate to={'/'} />;
  };

  return (
    <AnimatePresence mode="wait">
      <HStack>
        <NavBar />
        <RoutesGroup location={location} key={location.pathname}>
          <Route path="/" element={renderBasedOnAuthStatus()} />
          <Route path="/group/:uuid" element={renderBasedOnAuthStatus()} />
          <Route
            path="/privateConversation/:uuid"
            element={renderBasedOnAuthStatus(<PrivateConversationChat />)}
          />
        </RoutesGroup>
      </HStack>
    </AnimatePresence>
  );
}
