import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <div className="relative w-24 h-24">
          <div className="absolute inset-0 border-4 border-primary/20 rounded-full"></div>
          <div 
            className="absolute inset-0 border-4 border-t-primary rounded-full animate-spin"
            style={{ borderTopColor: 'hsl(var(--primary))' }}
          ></div>
        </div>
        <p className="mt-4 text-lg font-semibold text-muted-foreground animate-pulse">Cargando...</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;
