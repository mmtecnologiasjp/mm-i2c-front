import './index.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { Toaster } from 'react-hot-toast';
import { QueryClient, QueryClientProvider } from 'react-query';

import { Routes } from './routes';

const client = new QueryClient();
const ssoProviderProps = {
  clientId: import.meta.env.VITE_SSO_CLIENT_ID,
  clientSecret: import.meta.env.VITE_SSO_CLIENT_SECRET,
  grant_type: import.meta.env.VITE_SSO_GRANT_TYPE,
  redirectUri: import.meta.env.VITE_SSO_REDIRECT_URI,
  ssoServiceBaseURL: import.meta.env.VITE_SSO_SERVICE_BASE_URL,
  scope: import.meta.env.VITE_SSO_SCOPE,
  tokenDataKey: import.meta.env.VITE_SSO_TOKEN_DATA_KEY,
};

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <QueryClientProvider client={client}>
    <Toaster position="top-center" />
    <Routes />
  </QueryClientProvider>,
);
