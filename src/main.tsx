import { Suspense } from 'react';
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import './i18n';
import { AuthProvider } from 'react-oidc-context';

const cognitoAuthConfig = {
  authority: import.meta.env.VITE_COGNITO_AUTHORITY,
  client_id: import.meta.env.VITE_COGNITO_CLIENT_ID,
  redirect_uri: import.meta.env.VITE_COGNITO_REDIRECT_URI,
  response_type: import.meta.env.VITE_COGNITO_RESPONSE_TYPE,
  post_logout_redirect_uri: import.meta.env.VITE_COGNITO_POST_LOGOUT_REDIRECT_URI,
  scope: import.meta.env.VITE_COGNITO_SCOPE,
};

createRoot(document.getElementById("root")!).render(
  <Suspense fallback="Loading...">
    <AuthProvider {...cognitoAuthConfig}>
      <App />
    </AuthProvider>
  </Suspense>
);
