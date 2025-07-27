import { Suspense } from 'react';
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import './i18n';
import { AuthProvider } from 'react-oidc-context';

const cognitoAuthConfig = {
  authority: "https://cognito-idp.us-east-1.amazonaws.com/us-east-1_g8y7bJldl",
  client_id: "7phb51dgqg7rimgv9nbtgvprc8",
  redirect_uri: "https://hswift.obsicore.com/dashboard",
  response_type: "code",
  post_logout_redirect_uri: "https://hswift.obsicore.com/",
  scope: "openid",
};

createRoot(document.getElementById("root")!).render(
  <Suspense fallback="Loading...">
    <AuthProvider {...cognitoAuthConfig}>
      <App />
    </AuthProvider>
  </Suspense>
);
