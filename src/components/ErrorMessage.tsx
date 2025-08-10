import { AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { User } from '@/hooks/useUser';

const ErrorMessage = () => {
  const auth = new User().getAuth();
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center p-8 max-w-md mx-auto bg-card border border-destructive/50 rounded-lg shadow-lg">
        <AlertTriangle className="w-16 h-16 text-destructive mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-destructive-foreground mb-2">Authentication Error</h2>
        <p className="text-muted-foreground mb-6">
          Oops! Something went wrong while trying to sign you in. Please try again.
        </p>
        {auth.error && (
          <p className="text-sm text-red-400 bg-red-900/20 p-2 rounded-md mb-6">
            <code>{auth.error.message}</code>
          </p>
        )}
        <Button onClick={() => auth.signinRedirect()} variant="destructive">
          Try Again
        </Button>
      </div>
    </div>
  );
};

export default ErrorMessage;
