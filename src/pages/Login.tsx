import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from 'react-oidc-context';
import { useTranslation } from 'react-i18next';

const Login = () => {
  const { t } = useTranslation();
  const { isAuthenticated, isLoading, signinRedirect } = useAuth();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      signinRedirect();
    }
  }, [isLoading, isAuthenticated, signinRedirect]);

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
        <p className="mt-2 text-muted-foreground">{t('login.redirecting')}</p>
      </div>
    </div>
  );
};

export default Login;