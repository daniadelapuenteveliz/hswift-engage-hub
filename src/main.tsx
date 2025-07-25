import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { AuthProvider } from 'react-oidc-context';

const cognitoAuthConfig = {
  authority: "https://cognito-idp.us-east-1.amazonaws.com/us-east-1_g8y7bJldl",
  client_id: "7phb51dgqg7rimgv9nbtgvprc8",
  redirect_uri: "http://localhost:3000/dashboard",
  response_type: "code",
  post_logout_redirect_uri: "http://localhost:3000",
  scope: "openid",
};

createRoot(document.getElementById("root")!).render(
  <AuthProvider {...cognitoAuthConfig}>
    <App />
  </AuthProvider>
);
